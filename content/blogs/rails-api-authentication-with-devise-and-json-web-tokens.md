---
  title: Rails 7 API auth with Devise and JSON Web Tokens
  description: Adding secured authentication to our Rails api with the devise and devise_jwt gems.
  cover_url: /images/blogs/devise_jwt.png
  date: 1691445600
  resources:
    - ["Devise documentation", "https://github.com/heartcombo/devise/wiki"]
    - ["JWT revocation strategies", "https://waiting-for-dev.github.io/blog/2017/01/24/jwt_revocation_strategies"]
    - ["Devise JWT Documentation", "https://github.com/waiting-for-dev/devise-jwt"]
    - ["Create a Rails 7 REST API", "/blogs/create-a-rails-7-rest-api"]
---

<img src="/images/blogs/devise_jwt.png" alt="Frontend Development banner" width="800">
<em class="date">August 8th 2023</em>

# Rails 7 API auth with Devise and JSON Web Tokens

### Adding secured authentication to our Rails api with the devise and devise_jwt gems.

In the previous article of this serie, <a href="/blogs/create-a-rails-7-rest-api" target="_blank">Create a Rails 7 REST API</a>, we made an API that can create, destroy and complete a given task as well as return a list of all of our tasks. The application is basic but the concepts applied can be reproduced for most of the logic you'd need from your API.

An exception to this is going to be authentication.<br />
Authentication is a complex topic that requires thorough security measures to ensure the users' personal data is safe. Most of the time this is something you'll want to use a dedicated tool for and in Rails application the most widely used auth tool is <a href="https://github.com/heartcombo/devise" target="_blank">Devise</a>.

Devise works really well in a Fullstack Rails application but it wasn't made to work with an API. The problem is that when working with an API the user needs to pass down data from the Client to the API and we need to secure this data transfer too. There are a couple ways to do this but the one I'm gonna go with in this article is called JSON Web Tokens, or `JWT` for short, and we have a wonderful way to pair that to Devise with the help of <a href="https://github.com/waiting-for-dev/devise-jwt" target="_blank">devise_jwt</a>.

Alright let's begin by installing Devise to our existing API and change a couple things in our `Task` model at the same time.

## Installing Devise

Let's add these couple gems in our `api/Gemfile` first.
```ruby [api/Gemfile]
gem "devise"

gem "devise-jwt"
```

We can then install Devise like so
```bash
bin/bundle install
bin/rails generate devise:install
```

We'll get a few instructions in our terminal after running the latter command but the only one we need to pay attention to is the first one.<br />
Devise can use ActionMailer to send confirmation mail and such so in case you want to use that we need to make sure that the default url for ActionMailer is configured properly.

Let's go to our `config/environments/development.rb`, there you should find some existing configurations for ActionMailer, let's add this new one in there.
```ruby [api/config/environment/development.rb]
Rails.application.configure do
  ...
  config.action_mailer.default_url_options = { host: "localhost", port: 3000 }
  ...
end
```

(If you wanna know how to set up ActionMailer in your application later on you can have a look at my other <a href="/blogs/send-mail-on-rails-7-with-gmail" target="_blank">article</a>.)

Because of a <a href="https://github.com/waiting-for-dev/devise-jwt/issues/235#issuecomment-1475410637" target="_blank">bug</a> with Devise and API only applications we also need to add the following configuration to Devise's initializer.
```ruby [api/config/initializers/devise.rb]
Devise.setup do |config|
  ...

  config.warden do |manager|
    manager.scope_defaults :user, store: false

    ...
  end

  ...
end
```

Now that Devise is installed we can generate a new `User` model and add a user foreign key to our tasks table.
```bash
bin/rails generate devise User
bin/rails generate migration AddUserToTasks user:references
```

```ruby [api/db/migrate/..._devise_create_users.rb]
## These are the only config we need in this example. Change this as you need.

class DeviseCreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      ## Database authenticatable
      t.string :email,              null: false, default: ""
      t.string :encrypted_password, null: false, default: ""

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
  end
end
```

```ruby [api/config/routes.rb]
Rails.application.routes.draw do
  devise_for :users
  ...
end
```

```ruby [api/app/model/user.rb]
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :recoverable, :rememberable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :validatable

  has_many :tasks, dependent: :destroy
end
```

```ruby [api/db/migrate/..._add_user_to_tasks.rb]
class AddUserToTasks < ActiveRecord::Migration[7.0]
  def change
    Task.destroy_all

    add_reference :tasks, :user, null: false, foreign_key: true
  end
end
```

```ruby [api/app/model/task.rb]
class Task < ApplicationRecord
  belongs_to :user
end
```

```bash
bin/rails db:migrate
```

The reason I destroyed all the Task instances in the `AddUserToTasks` migration is because I then set the `user_id` column yo not be null and I set the users' tasks to be destroyed if their user is destroyed. This means no task without a user can exist and at this point any Task we could have had wouldn't have a user_id.

Now that the models are ready we'll also edit our controllers to require authentication and to only share the current logged in user's data.

```ruby [api/app/controllers/application_controller.rb]
class ApplicationController < ActionController::API
  before_action :authenticate_user!
end
```

```ruby [api/app/controllers/tasks_controller.rb]
class TasksController < ApplicationController
  ...

  def index
    render json: {
      # tasks: Task.all
      tasks: current_user.tasks
    }, status: :ok
  end

  def create
    # task = Task.new(task_params)
    task = current_user.tasks.new(task_params)

    ...
  end

  ...

  private

  def set_post
    # @task = Task.find(params[:id])
    @task = current_user.tasks.find(params[:id])
  end

  ...
end
```

Now if we try to make a request with <a href="https://www.postman.com/" target="_blank">Postman</a> again we will receive an empty response and we can see in our Rails' server log that we've been redirected to the `GET "/users/sign_in"` endpoint.
```bash
Started GET "/tasks" for 54.86.50.139 at 2023-08-08 22:42:18 +0200
  ActiveRecord::SchemaMigration Pluck (1.6ms)  SELECT "schema_migrations"."version" FROM "schema_migrations" ORDER BY "schema_migrations"."version" ASC
Processing by TasksController#index as */*
Completed 401 Unauthorized in 5ms (ActiveRecord: 0.0ms | Allocations: 880)


Started GET "/users/sign_in" for 54.86.50.139 at 2023-08-08 22:42:19 +0200
Processing by Devise::SessionsController#new as */*
Completed 200 OK in 47ms (Views: 0.1ms | ActiveRecord: 8.2ms | Allocations: 8947)
```

That's good. This means the `before_authenticate!` is working.<br />
Time to handle the authentication itself now !

## Configuring Devise's controllers

We need to be able to respond from, and with, JSON with our Devise controllers. To do that we'll overwrite the existing controllers which means going through Devise's code base to figure out what needs to be edited.<br />

Luckily I've already done that and here's my solution.
```bash
bin/rails g devise:controllers users -c sessions registrations
```

```ruby [api/app/controllers/users/registrations_controller.rb]
class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if request.method == "DELETE"
      # current_user is destroyed successfully
      render status: :ok
    elsif request.method == "POST" && resource.persisted?
      # current_user is created successfully
      render json: {
        user: current_user
      }, status: :ok
    else
      # current_user is not created successfully
      render json: {
        messages: resource.errors.full_messages
      }, status: :unprocessable_entity
    end
  end
end
```

```ruby [api/app/controllers/users/sessions_controller.rb]
class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def destroy
    @authenticated = true
    super
  end

  private

  def verify_signed_out_user
    current_user
    super
  end

  def respond_to_on_destroy
    if @authenticated && current_user.nil?
      # current_user is logged out successfully
      render status: :ok
    else
      # current_user is not logged out successfully
      render status: :unprocessable_entity
    end
  end

  def respond_with(_resource, _opts = {})
    if current_user
      # current_user is logged in successfully
      render json: {
        user: current_user
      }, status: :ok
    else
      # current_user is not logged in successfully
      render json: {
        messages: ["Invalid Email or Password."],
      }, status: :unprocessable_entity
    end
  end
end
```

```ruby [api/config/routes.rb]
Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }

  ...
end
```

Because of the way Devise handles <a href="https://github.com/heartcombo/devise/blob/main/app/controllers/devise/sessions_controller.rb" target="_blank">failed login</a> attemps we also need to overwrite its <a href="https://github.com/heartcombo/devise/blob/main/lib/devise/failure_app.rb" target="_blank">FailureApp</a> and we'll make it use our `Users:SessionsController#respond_with` `else` statement instead.

Create a `api/app/lib/users/failure_app.rb` file then add the following code.
```ruby [api/app/lib/users/failure_app.rb]
class Users::FailureApp < Devise::FailureApp
  def http_auth
    redirect_to new_user_session_path
  end
end
```

The logic behind this redirect is that if a user tries to log in with the wrong credentials he will be redirected to the `Users::SessionsController#new` action which will eventually end up using our `Users:SessionsController#respond_with` method and because there is no `current_user` the method will render an error message. A bit hacky I admit but works like a charm.

Then back into Devise's initializer we'll configure `warden` to use our own failure app instead.
```ruby [api/config/initializers/devise.rb]
Devise.setup do |config|
  ...

  config.warden do |manager|
    manager.failure_app = Users::FailureApp
    ...
  end

  ...
end
```

Now if we go to <a href="https://www.postman.com/" target="_blank">Postman</a> again, we can sign up and sign in to our API.
```json
// POST /users { headers: { "Content-Type": "application/json" }, body: { "user": { "email": "user@example.com", "password": "password", "password_confirmation": "password" } } }
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2023-08-08T21:39:30.040Z",
    "updated_at": "2023-08-08T21:39:30.040Z"
  }
}
```

```json
// POST /users/sign_in { headers: { "Content-Type": "application/json" }, body: { "user": { "email": "user@example.com", "password": "password" } } }
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2023-08-08T21:39:30.040Z",
    "updated_at": "2023-08-08T21:39:30.040Z"
  }
}
```

For the rest we'll need to enable JSON Web Tokens so let's move on to our final step

## Adding JWT protocol to Devise

Devise_jwt offers multiple <a href="https://github.com/waiting-for-dev/devise-jwt#revocation-strategies" target="_blank">JWT revocation strategies</a>. I've used the Denylist and the JTIMatcher in the past and I'm found of the latter so that's the one I'm gonna go with in this example but feel free to check out the others later and choose what fits your needs best of course.

Let's add a new column to our `users` table called `jti` and enable the strategy in our `User` model
```bash
bin/rails generate migration AddJtiToUsers
```

```ruby [api/db/migrate/..._add_jti_to_users.rb]
class AddJtiToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :jti, :string, null: false
    add_index :users, :jti, unique: true

    # If you already have user records, you will need to initialize its `jti` column before setting it to not nullable. Your migration will look this way:
    # add_column :users, :jti, :string
    # User.all.each { |user| user.update_column(:jti, SecureRandom.uuid) }
    # change_column_null :users, :jti, false
    # add_index :users, :jti, unique: true
  end
end
```

```bash
bin/rails db:migrate
```

```ruby [api/app/models/user.rb]
class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  ...

  devise :database_authenticatable, :registerable, :validatable,
    :jwt_authenticatable, jwt_revocation_strategy: self

  ...
end
```

We'll also need to add a new secret key to our Rails credentials (more about Rails credentials <a href="/blogs/send-mail-on-rails-7-with-gmail#storing-our-google-credentials-safely" target="_blank">here</a> if you're unsure what they are) and configure JWT in Devise's initializer file.

Firstly run this command to generate a new secret key and copy it.
```bash
bin/bundle exec rake secret
```

Then, assuming you're using VSCode, run the following command to open your `api/config/credentials.yml.enc` file and paste the key you just generated.
```bash
EDITOR="code --wait" bin/rails credentials:edit
```

```yml [xxx.credentials.yml]
...

devise_jwt_secret_key: PASTE NEW SECRET KEY HERE
```

Finally edit Devise's intilializer (again).
```ruby [api/config/initializers/devise.rb]
Devise.setup do |config|
  ...

  config.jwt do |jwt|
    jwt.secret = Rails.application.credentials.devise_jwt_secret_key!
  end
end
```

We're nearly done now.<br />
The last couple things we'll need are to create a new controller that'll return the current_user from a get request and to update our existing users controller to not leak the current_user's `jti` to the frontend.

```bash
bin/rails generate controller Users::CurrentUser
```

```ruby [api/app/controllers/users/current_user_controller.rb]
class Users::CurrentUserController < ApplicationController
  def index
    render json: {
      user: current_user.as_json(except: :jti)
    }, status: :ok
  end
end
```

```ruby [api/config/routes.rb]
Rails.application.routes.draw do
  ...

  get "users/current_user", to: "users/current_user#index"

  ...
end
```

```ruby [api/app/controllers/users/registrations_controller.rb]
class Users::RegistrationsController < Devise::RegistrationsController
  ...

  def respond_with(resource, _opts = {})
    if request.method == "DELETE"
      ...
    elsif request.method == "POST" && resource.persisted?
      render json: {
        # user: current_user
        user: current_user.as_json(except: :jti)
      }, status: :ok
    else
      ...
    end
  end
end
```

```ruby [api/app/controllers/users/sessions_controller.rb]
class Users::SessionsController < Devise::SessionsController
  ...

  def respond_with(_resource, _opts = {})
    if current_user
      render json: {
        # user: current_user
        user: current_user.as_json(except: :jti)
      }, status: :ok
    else
      ...
    end
  end
end
```

And finally we have to expose the JSON Web Token that's being created to our responses by updating our Rack Cors configuration.
```ruby [api/config/initializer/corse.rb]
...

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    ...

    resource "*",
      ...
      headers: :any,
      methods: %i[get post put patch delete options head],
      expose: %w[Authorization]
  end
end
```


And we are done !

Signing in with <a href="https://www.postman.com/" target="_blank">Postman</a> again will reveal a new `header` in the response's "Headers" tab.
```json
// POST /users/sign_in { headers: { "Content-Type": "application/json" }, body: { "user": { "email": "user@example.com", "password": "password" } } }
"Authorization": "Bearer ..."
```

We can now use this `Authorization` header in our requests to log in without credentials, to create a new `Task`, to log out etc...
```json
// GET /current_user { headers: { "Authorization": "YOUR_BEARER_TOKEN" } }
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2023-08-08T21:39:30.040Z",
    "updated_at": "2023-08-08T21:39:30.040Z"
  }
}
```

```json
// POST /tasks { headers: { "Content-Type": "application/json", "Authorization": "YOUR_BEARER_TOKEN" }, body: { "title": "Finish the second article" } }
{
  "task": {
    "id": 1,
    "title": "Finish the second article",
    "completed": false,
    "created_at": "2023-08-03T15:09:48.255Z",
    "updated_at": "2023-08-03T15:09:48.255Z",
    "user_id": 1
  }
}
```

```json
// DELETE /users/sign_out { headers: { "Authorization": "YOUR_JSON_WEB_TOKEN" } }
"status": 200
```

After signing out if we try to use the same Bearer Token again to create a new Task it won't work anymore because our User's `jti` has been replaced per the `JTIMatcher` strategy.

```json
// POST /tasks { headers: { "Content-Type": "application/json", "Authorization": "YOUR_JSON_WEB_TOKEN" }, body: { "title": "Go to sleep" } }
{
  "messages": [
    "Invalid Email or Password."
  ]
}
```

If all of these Postman requests acted as expected then it means that everything is set up properly. Your Rails REST API now enabled secure authentication with Devise and JWT.

The next step will be to finally use this API in our frontend application but that'll be in a new article, this one already's long enough and to be perfectly honest with you it's 2am at the time I'm finishing those lines and I still need to check for typos. Oops

Anyway, good job on following along this guide. Next and final step of our ToDo list application soon.

Cheers
