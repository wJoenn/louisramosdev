---
  title: Create a Rails 7 REST API
  description: First step out of three in creating a Vue on Rails application with authentication.
  cover_url: /images/blogs/rails_api.jpg
  date: 1690978803
  resources:
    - ["Rails API documentation", "https://api.rubyonrails.org/"]
    - ["Ngrok installation guide", "https://ngrok.com/docs/getting-started/"]
    - ["Send your first API request with Postman", "https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/"]
    - ["Rails 7 API auth with Devise and JSON Web Tokens", "/blogs/rails-api-authentication-with-devise-and-json-web-tokens"]
---

<img src="/images/blogs/rails_api.jpg" alt="Frontend Development banner" width="800">
<em class="date">August 2nd 2023</em>

# Create a Rails 7 REST API

### First step out of three in creating a Vue on Rails application with authentication.

Rails is known for being a powerful full stack framework to build applications with and its frontend developer experience and performance has increased a lot with the help of Hotwire and new bundling solutions such as importmap, jsbundling or <a href="/blogs/ruby-on-rails-7-and-vite" target="_blank">vite_rails</a>.


But sometimes using just Rails might not be the best solution for you.<br />
Maybe a Multi Page Application is not reactive enough for your purpose, you'd like to leverage a different rendering pattern for your frontend application, whether that would be SPA, SSR or something else.<br />
Maybe you are in a team with developers of different skillsets and you'd like to separate the frontend and the backend of your application so that everyone can focus on what they do best with the tool they're proficient with the most ?<br />
Both of these cases are realisable by using Rails as an API only instead of a fullstack application.

This article is the first out of a series of 3 in which I'll accompany you in the creation of a simple SPA client backed by a Rails REST API with Devise authentication in the form of a TO-DO list app. This first step will consist in creating this Rails API and test its endpoints with Postman. It doesn't matter what solution you choose for your frontend at the moment as we'll only focus on the backend for now.

## Creating the project

Rails has a very convenient flag to use during the project creation, being `--api`.<br />
Because we are not using Rails for any frontend that means there is a lot of features that we don't need anymore. Assets handling, JavaScript, views, all of this will be handled by our JavaScript framework in the next article, so using this `--api` flag will remove a lot of useless boilerplate as well as give us a more lightweight application.

There are a lot of ways to manage a fullstack project but for simplicity's sake I will create a monorepo with a client directory for my frontend, an `api` directory for my backend and a bin directory for any executable script I might need.

```bash
mkdir to-do-list
cd to-do-list
rails new --api -d postgresql api
```

That'll create my monorepo `to-do-list` and the Rails API inside a directory called `api`.

The thing is, I don't want to have to cd into my `api` directory everytime I want to run a `rails` command, later on I'll also want to run both my frontend server and backend server and if I could do that from the root directory it'd provide a better developer experience.<br />
That's why I like to create a few simple executable scripts.

Inside a `bin` directory let's create a couple files called `rails` and `bundle`, you don't need to provide an extension as these will be executable files.<br />
Inside `bin/bundle` you can add the following
```bash [bin/bundle]
#!/bin/bash

cd api && bundle "$@"
```

The first line is called a `shebang`, it provides instructions to your operating system as to what language it needs to use to execute this code. If you're using an IDE like Visual Studio Code it will also provide color highlighting corresponding to the specified language.

The second line is the actual script. This one means that when the script executes it will first cd into the `api` directory and once there run Rails' `bundle` command.<br />
`$@` corresponds to whatever arguments you wrote in your initial command.

For example, when running
```bash
bundle install
```

the `$@` would be `install`

We can do another executable for rails real quick by adding a `bin/rails` file too
```bash [bin/rails]
#!/bin/bash

bundle exec rails "$@"
```

The last step to make these scripts usable is to edit their executable rights. To do so run these couple commands
```bash
chmod +x bin/bundle
chmod +x bin/rails
```

Just before we install our gems let's just go inside out Gemfile and uncomment <a href="https://github.com/cyu/rack-cors" target="_blank">rack_cors</a> which will provide support for Cross-Origin Resource Sharing which enables cross domain AJAX request calls to our Rails API.
```ruby [Gemfile]
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem "rack-cors"
```

We also need to uncomment rack_cors' configuration in its initializer file. Eventually you'll want to add the domain name of your client application as the origin but for now let's accept requests from anything for simplicity's sake.
```ruby [api/app/congif/initializers/cors.rb]
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*"

    resource "*",
      headers: :any,
      methods: %i[get post put patch delete options head]
  end
end
```

We can now finish the creation of our Rails API by installing installing our gems and creating our database.
```bash
bin/bundle install
bin/rails db:create
```

## Generating our Task model and controllers

This is usual stuff so I'll go over it fairly quickly.

Let's first generate a new `Task` model and give it a few attributes such as "title" and "completed"
```bash
rails generate model Task title completed:boolean
```

```ruby [api/db/migrate/..._create_tasks.rb]
class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.boolean :completed, default: false, null: false

      t.timestamps
    end
  end
end
```

```ruby [api/app/models/task.rb]
class Task < ApplicationRecord
  validates :title, presence: true
end
```

```bash
rails db:migrate
```

You'll notice while navigating through our `api/app` directory that we indeed don't have an `/assets` or `/javascript` directory.

The `/views` folder is still here but it's only being used for emails templates if you decide to use ActionMailer with this application. (Have a look <a href="/blogs/send-mail-on-rails-7-with-gmail" target="_blank">here</a> if you want to know how to use ActionMailer with your gmail address from your Rails application)

Now that the `Task` model is ready we'll also create a `TasksController` with some actions : "index", "create", "destroy" and a custom one to handle completion; "complete"

```bash
rails generate controller Tasks index create destroy complete
```

```ruby [api/config/routes.rb]
Rails.application.routes.draw do
  resources :tasks, only: %i[index create destroy] do
    member do
      patch :complete
    end
  end
end
```

```ruby [api/app/controllers/tasks_controller.rb]
class TasksController < ApplicationController
  before_action :set_post, only: %i[destroy complete]

  def index
  end

  def create
  end

  def destroy
  end

  def complete
  end

  private

  def set_post
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title)
  end
end
```

Before we go on with creating the logic for each routes, have a look at the `app/controllers/application_controllers.rb` file. You'll notice that this controller isn't inheriting from `ActionController::Base` like with fullstack Rails applications but with `ActionController::API` instead this time. You can have a look at the <a href="https://api.rubyonrails.org/classes/ActionController/API.html" target="_blank">documentation</a> to see what the differences are but basically it just means we're using a more lightweight version of ActionController which doesn't use unnecessary features such as template rendering, flashes or assets.

## Writing our first endpoint

Let's begin with the `create` action as we'll need to have some tasks before being able to test the rest.

The initial logic is the same as a fullstack Rails application. We get the params, create a new Task, if it's saved successfully we do something, otherwise we do something else.

These "something" usually mean redirecting to another page or rendering a erb template but in our case what we want to do is render a json object that our frontend will receive.

That's easily done with `render :json`
```ruby [api/app/controllers/tasks_controller.rb]
class TasksController < ApplicationController
  ...

  def create
    task = Task.new(task_params)

    if task.save
      render json: {
        task: task
      }, status: :created
    else
      render json: {
        messages: task.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  ...

  private

  ...

  def task_params
    params.require(:task).permit(:title)
  end
end
```

Now if we try to make a POST request to our `/tasks` endpoint we should receive a json object with the created task.

In order to try this we will use a tool called <a href="https://www.postman.com/" target="_blank">Postman</a>. You can either use the web version or the application. If you decide to use the web version you'll need a way to use your localhost publicly first though so I'll quickly go over that.<br />
We'll use <a href="https://ngrok.com/download" target="_blank">Ngrok</a> for that.

Once you've downloaded Ngrok and you've added your authkey to your system's configuration (follow Ngrok's instructions for that), you'll need to authorize Ngrok to access your Rails application by adding the domain Ngrok gives you to your `config/environments/development.rb` file.<br />
The problem with this method is that everytime you open a new Ngrok server you have to change the domain name manualy.

What I like to do instead is add a regex expression that'll match any ngrok domain
```ruby [api/config/environments/development.rb]
Rails.application.configure do
  ...

  config.hosts << /.*\.ngrok\.io/
  config.hosts << /.*\.ngrok-free\.app/
end
```

You can finally run both the Rails' server and the Ngrok's server in two separate terminals
```bash
rails server
```
```bash
ngrok http 3000
```

Copy the https url given to you by Ngrok, open Postman and make a POST request to your `NGROK_URL/tasks` with a `Headers` of `Content-Type: application/json` and a `raw JSON Body` of `{ "title": "Finish this article" }`.<br />
Press `Send` and you should receive a json response at the bottom of your screen like so :
```json
// POST /tasks { headers: { "Content-Type": "application/json" }, body: { "title": "Finish this article" } }
{
  "task": {
    "id": 1,
    "title": "Finish the article",
    "completed": false,
    "created_at": "2023-08-03T15:09:48.255Z",
    "updated_at": "2023-08-03T15:09:48.255Z"
  }
}
```

Congrats your first endpoint is ready.

## Wrapping Up

Let's do our 3 other endpoints real quick.

First the `index` which renders a JSON with all the `Task` instances
```ruby [api/app/controllers/tasks_controller.rb]
class TasksController < ApplicationController
  ...

  def index
    render json: {
      tasks: Task.all
    }, status: :ok
  end

  ...
end
```

The `destroy` which returns a confirmation message.
```ruby [api/app/controllers/tasks_controller.rb]
class TasksController < ApplicationController
  before_action :set_task, only: %i[destroy complete]
  ...

  def destroy
    @task.destroy

    render json: {
      messages: ["Task destroyed successfully"]
    }, status: :ok
  end

  ...

  private

  def set_task
    @task = Task.find(params[:id])
  end

  ...
end
```

In this case the message serves as a visual feedback for our testing in Postman but as the status is already `ok` it would make sense to just render the status with `render status: :ok`.

And finally the `complete` action which updates the task's completion
```ruby [api/app/controllers/tasks_controller.rb]
class TasksController < ApplicationController
  before_action :set_task, only: %i[destroy complete]
  ...

  def complete
    if @task.update(completed: true)
      render json: {
        task: @task
      }, status: :ok
    else
      render json: {
        messages: @task.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  ...
end
```

And we're done.<br />
Again you can try to make requests to your API with Postman and you should get those responses.
```json
// GET /tasks
{
  "tasks": [
    {
      "id": 1,
      "title": "Finish the article",
      "completed": false,
      "created_at": "2023-08-03T15:09:48.255Z",
      "updated_at": "2023-08-03T15:09:48.255Z"
    }
  ]
}
```
```json
// PATCH /tasks/1/complete
{
  "task": {
    "completed": true,
    "id": 1,
    "title": "Finish the article",
    "created_at": "2023-08-03T15:09:48.255Z",
    "updated_at": "2023-08-03T15:42:05.366Z"
  }
}
```
```json
// DELETE /tasks/1
{
  "messages": [
    "Task destroyed successfully"
  ]
}
```

Congratulation, your Rails API is now ready to use.

In the next article, <a href="/blogs/rails-api-authentication-with-devise-and-json-web-tokens" target="_blank">Rails 7 API auth with Devise and JSON Web Tokens</a>, I over how to handle authentication with our API and after this one we'll create a basic frontend client to use this API from.<br /> Until then feel free to experiment with your newly acquired skill of course !

Cheers !
