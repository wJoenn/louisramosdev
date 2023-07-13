---
  title: Ruby on Rails & Vite
  description: A guide on how to implement Vite in our Ruby on Rails applications.
  cover_url: /images/vite_rails.png
---

![Vite_rails banner](/images/vite_rails.png)

# {{ title }}

During my bootcamp at LeWagon we were introduced to a Rails workflow using Sprockets and JSBundling with Webpack.<br />

We weren't told much to be honest except that up to Rails 6 the default bundling method with Rails was webpacker with Webpack, that Rails 7 introduced importmap but that as the most popular tool in companies is still Webpack that's what we'd use during our bootcamp.
The argument of "using the most widely used tool" made sense at the time but it came with a few drawbacks.<br />
Webpack is slow. I remember everytime I would change one line of css I had to wait at least 5 seconds for the whole application to rebundle. It also required me to manually refresh my browser everytime I made a change. The configuration is complex.<br />
Point is, it's not a very good tool anymore in my opinion.<br />

So after my bootcamp I started looking into alternatives. Importmap was an obvious solution but I wasn't too keen on using it because of the lack of adoption still.<br />
Another option was replacing Sprockets by Propshaft and Webpack by esBuild. This seems to become a very popular solution among Rails developer and one that is natively supported by Rails. The only issue is that it does not allow for Hot Module Replacement without another gem and I wanted to have that without the need for an additional dependency. That's when I started looking into Vite. Eventually I ended up adding a couple dependencies for some extra feature, and I'll talk about those in this guide, but at this point I had seen the other options and it didn't feel like a such a burden anymore so I stuck with it.

Vite is becoming a very popular tool in frontend development, it is fast, reliable, easy to set up. It enables AutoReload when you save your content and Hot Module Replacement. Only issue is, in a Rails project it relies on a third-party gem.<br />
Nevertheless if you wanna give it a try here's a step by step guide on how to create a new project using Vite.
For this example we'll also be using Stimulus and Sass for our frontend.

## Creating a new project

First thing first, create a new project.<br />
Vite is gonna handle the whole bundling process, that means we won't need a javascript bundler in our installation nor will we need to use the asset pipeline at all.
To create the project run the following command in your terminal.
```bash
$ rails new --skip-asset-pipeline --skip-javascript YOUR_PROJECT_NAME
```

Once created you can add a couple gems in your `Gemfile`
```ruby [Gemfile]
# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Vite.js integration in Ruby web apps [https://vite-ruby.netlify.app/]
gem "vite_rails"
```

Then run `bundle` in your terminal to install the gems.<br />
Finally before moving on we'll create a `package.json` file, either by running `yarn init` in your terminal or by simply creating the file yourself and adding the following content inside of it
```json [package.json]
{
  "name": "app",
  "private": "true",
}
```

Now just to make sure Vite's installer uses yarn in the next step instead of npm, run `yarn` once in your terminal which will generate an empty `yanr.lock` file.

## Vite

Now that the project is created we can begin by installing Vite to our project.
The gem was added and bundled in our Gemfile in the previous step so you can now run the following commands
```bash
$ bundle exec vite install
$ yarn add -D vite-plugin-full-reload
```

The first one will install Vite in the project from the vite_rails gem we installed.<br />
The second command is a plugin for Vite which will enable automatic reloads when you modify a html file during development.

This process has created, among other files, a `vite.config.js` file in our root repository which we will now modify to include the "full reload" plugin we installed.
```js [vite.config.js]

import { defineConfig } from "vite"
import RubyPlugin from "vite-plugin-ruby"
import FullReload from "vite-plugin-full-reload"

export default defineConfig({
  plugins: [
    RubyPlugin(),
    FullReload(["config/routes.rb", "app/views/**/*"], { delay: 200 })
  ]
})
```

Notice that in our `app` directory, vite_rails also created a new directory called `frontend`. This will directory will now include all of our assets and javascript code.<br />
You can also have a look at your `app/views/layouts/application.html.erb` file where you'll see vite_rails has replaced the initial script tag by a `vite_javascript_tag` and added a new `vite_client_tag`.
That's it.

Vite is installed and ready to run.

## Turbo & Stimulus

Before installing turbo we're gonna have to create our javascript file ourself as we skipped that step when created the project.<br />
Create a new `javascript/application.js` file in your root either manually or with
```bash
$ mkdir -p app/javascript && touch app/javascript/application.js
```
Then run `rails turbo:install` in your terminal.
That'll take care of Turbo.

After that run `rails stimulus:install` which will create a `app/javascript/controllers` directory and add a few files inside of it.

We now need to move the javascript directory inside our `app/frontend` directory and import it inside our vite entrypoint.<br />
Run
```bash
$ mv app/javascript app/frontend
```

Then in your `app/frontend/entrypoints/application.js` file you can add this line at the top
```js [app/frontend/entrypoints/application.js]
import "../javascript/application"
```

And finally let's wrap up by enabling Hot Module Replacement (HMR) in Stimulus with another Vite plugin.<br />
Run
```bash
$ yarn add -D vite-plugin-stimulus-hmr
```

And add
```js [vite.config.js]
...
import StimulusHMR from "vite-plugin-stimulus-hmr"

export default defineConfig({
  plugins: [
    ...
    StimulusHMR()
  ],
})
```

## PostCSS & Sass

PostCSS is a tool for transforming CSS with JavaScript. It is included with Vite and it will allow us to included utilities like Autoprefixer or Tailwindcss.<br />
Sass is not installed yet though so let's start with that :
```bash
$ yarn add -D sass autoprefixer
```

Create a `postcss.config.js` file in your root directory, this file will automatically be read by Vite and inside of it we'll enable Autoprefixer which will automatically prefix our css to be compatible across browsers.
```js [postcss.config.js]
const autoprefixer = require("autoprefixer")

module.exports = {
  plugins: [
    autoprefixer
  ]
}
```

Now create a `app/frontend/stylesheets/application.scss` file. This will be our main import hub for all of your Sass partials.<br />
We also need to create an entrypoint for Vite so let's add a `app/frontend/entrypoints/application.scss` file to our project and import the newly created file inside this one
```scss [app/frontend/entrypoints/application.scss]
@import "../stylesheets/application";
```

Finally let's go back to the `app/views/layouts/application.html.erb` file and we'll replace the stylesheet for our new entrypoint
```erb [app/views/layouts/application.html.erb]
<%# stylesheet_link_tag "application" %>
<%= vite_stylesheet_tag "application.scss" %>
```

Your are now ready to use Sass.

## Wrapping up

And that's it really.<br />
Your project is now ready to go.

So will everything be a smooth ride from now on ? Most of the time, yes.<br />
But as with any third party library there's always the possibility of having some issues.

One that I encountered for example is that you won't be able to use the Stimulus generator command in your terminal because stimulus is hardcoded to look for a `app/javascript/controllers` directory.<br />
I created a <a href="https://github.com/hotwired/stimulus-rails/pull/119" target="_blank">Pull Request</a> to fix that so you can have a look at my solution if you want<br />
Until it's merged you can use my fork instead of Stimulus' main repository by replacing the gem in your gemfile with my fork :
```ruby [Gemfile]
# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
# Using fork until PR is merged https://github.com/hotwired/stimulus-rails/pull/119
gem "stimulus-rails", github: "wJoenn/stimulus-rails", branch: "main"
```

Once reinstalled you should find a `config/initializers/stimulus.rb` file (if not, create it) and inside of it specify the new path for the generator with the following code
```ruby [config/initializers/stimulus.rb]
Stimulus.configure do |config|
  config.controllers_path = "app/frontend/javascript/controllers/"
end
```

This is just one issue though and later one you or I might find more.

Don't hesitate to read <a href="https://vite-ruby.netlify.app/guide/rails.html" target="_blank">vite_rails' documentation</a> if you're having trouble.
You'll find there the steps you need if you want to deploy on Heroku for example. Or some other helpers than can be used in Rails. Etc.


Anyway that's it for this guide.
Thanks for hanging out here and hopefully you'll adopt Vite in your workflow from now one.

Cheers.
