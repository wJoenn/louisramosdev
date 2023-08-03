---
  title: Create a Rails 7 REST Api
  description: First step out of three in creating a Vue on Rails application with authentification.
  cover_url: /images/blogs/rails-api.jpg
  date: 1690978803
---

<img src="/images/blogs/rails-api.jpg" alt="Frontend Development banner" width="800">

# Create a Rails 7 REST Api

### First step out of three in creating a Vue on Rails application with authentification.

Rails is known for being a powerful full stack framework to build applications with and its frontend developer experience and performance has increased a lot with the help of Hotwire and new bundling solutions such as importmap, jsbundling or <a href="/ruby-on-rails-7-&-vite" target="_blank">vite_rails</a>.


But sometimes using just Rails might not be the best solution for you.<br />
Maybe a Multi Page Application is not reactive enough for your purpose, you'd like to leverage a different rendering pattern for your frontend application, whether that would be SPA, SSR or something else.<br />
Maybe you are in a team with developers of different skillsets and you'd like to separate the frontend and the backend of your application so that everyone can focus on what they do best with the tool they're proficient with the most ?<br />
Both of these cases are realisable by using Rails as an API only instead of a full stack aplication.

This article is the first out of a serie of 3 in which I'll accompany you in the creation of a simple multi-page SPA client backed with a Rails REST API with Devise authentification in the form of a simple TO-DO list. This first step will consist in creating this Rails API and test its endpoints with Postman. It doesn't matter what solution you choose for your frontend at the moment, we'll only be using Ruby for now.

## Creating the project

Rails has a very convenient flag to use during the project creation, being `--api`.<br />
Because we are not using Rails for any frontend that means there is a lot of features that we don't need anymore. Assets handling, JavaScript, views, all of this will be handled by our JavaScript framework in the next article, so using this `--api` flag will remove a lot of useless boilerplate as well as give us a more lightweight application.

There are a lot of ways to manage a fullstack project but for simplicity's sake I will create a monorepo with a client directory for my frontend, an api directory for my backend and a bin directory for any executable script I might need.

```bash
mkdir to-do-list
cd to-do-list
rails new --api -d postgresql api
```

That'll create my monorepo `to-do-list` and the Rails api inside a directory called `api`.

The thing is, I don't want to have to cd into my `api` directory everytime I want to run a `rails` command, later on I'll also want to run both my frontend server and backend server and if I could do that from the root directory it'd provide a better developer experience.<br />
That's why I like to create a few simple executable scripts.

Inside a `bin` directory let's create a couple files called `rails` and `bundle`, you don't need to provide an extension as these will be executable files.<br />
Inside `bin/rails` you can add the following
```bash [bin/rails]
#!/bin/bash

cd api && rails "$@"
```

The first line provide instructions to your operating system as to what language it needs to use to execute this code. If you're using an IDE like Visual Studio Code it will also provide color highlighting corresponding to the specified language.

The second line is the actual script. This one means that when the script executes it will first cd into the `api` directory and once there run Rails' `rails` command.<br />
`$@` corresponds to whatever arguments you wrote in your initial command.

For example, when running
```bash
rails db:create
```

the `$@` would be `db:create`

We can do another executable for bundle real quick by adding a `bin/bundle` file too
```bash [bin/bundle]
#!/bin/bash

cd api && bundle "$@"
```

The last step to make these scripts usable is to edit their executable rights. To do so run these couple commands
```bash
chmod +x bin/rails
chmod +x bin/bundle
```

Just before we install our gems let's just go inside out Gemfile and uncomment <a href="https://github.com/cyu/rack-cors" target="_blank">rack_cors</a> which will provide support for Cross-Origin Resource Sharing which enables cross domain AJAX request calls to our Rails api.
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
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

We can now finish the creation of our Rails api by installing installing our gems and creating our database.
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
      t.string :title
      t.boolean :completed, default: false

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

The `/views` folder is still here but it's only being used for emails templates if you decide to use ActionMailer with this application. (Have a look <a href="/send-mail-on-rails-7-with-gmail" target="_blank">here</a> if you want to know how to use ActionMailer with your gmail address from your Rails application)

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

The initial logic is the same as a fullstack Rails application. We get the params, create a new Task, if it's saved sucessfully we do something, other we do something else.

These "something" usually mean redirecting to another page or rendering a erb template but in our case what we want to do is render a json object that our frontend will receive.

That's easily done with `render :json`
```ruby [api/app/controllers/tasks_controller.rb]
class TasksController < ApplicationController
  ...

  def create
    task = Task.new(task_params)

    if task.save
      render json: {
        messages: ["Task created successfully."],
        task: task
      }, status: :ok
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

The reason my success message is an array is because the `task.errors.full_messages` is an array of strings and I want to keep the typing of my response objects consistent.

Now if we try to make a POST request to our `/tasks` endpoint we should receive a json object with a success message and the task itself.

In order to try this we will use a tool called <a href="https://www.postman.com/" target="_blank">Postman</a>. You can either use the web version or the application but before we can do anything we need a way to use our localhost publically.<br />
We'll use <a href="https://ngrok.com/download" target="_blank">Ngrok</a> for that.

Once you've downloaded Ngrok and you've added your authkey to your system's configuration (follow Ngrok's instructions for that), you'll need to authorize Ngrok to access your Rails application by adding the domain Ngrok gives you to your `config/environments/develompent.rb` file
```ruby [api/config/environments/development.rb]
Rails.application.configure do
  ...

  config.hosts << NGROK_URL
end
```

The problem with this method is that everytime you open a new Ngrok server you have to change the domain name manualy so what I like to do instead is clear the hosts.
```ruby [api/config/environments/development.rb]
Rails.application.configure do
  ...

  config.hosts.clear
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
  "message": [
    "Task created successfully."
  ],
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

The `destroy` which returns a confirmation message
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

And finally the `complete` action which updates the task's completion
```ruby [api/app/controllers/tasks_controller.rb]
class TasksController < ApplicationController
  before_action :set_task, only: %i[destroy complete]
  ...

  def complete
    if @task.update(completed: true)
      render json: {
        messages: ["Task completed successfully"],
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
Again you can try to make requests to your api with Postman and you should get those responses.
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
  "messages": [
    "Task completed successfully"
  ],
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

Congratulation, your Rails api is now ready to use.

In the next article we will create a basic frontend client to use this API from and after this one we'll go over how to handle authentification with Devise and JSON web tokens.<br /> Until then feel free to experiment with your newly acquired skill of course !

Cheers !
