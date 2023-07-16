---
  title: Ruby on Rails 7 & Vite
  description: A guide on how to setup a Rails application with Sass, Stimulus and Vite.
  cover_url: /images/vite_rails.png
---

![Vite_rails banner](/images/vite_rails.png)

# Ruby on Rails 7 & Vite

### How to setup a Rails application with Sass, Stimulus and Vite.

During my bootcamp at LeWagon we were introduced to a Rails workflow using Sprockets and Webpack (jsbundling-rails).<br />

To be honest, we weren't told much about that other that up to Rails 6 the default bundler with Rails was Webpack (webpacker) and that Rails 7 introduced importmap, but, as the most popular tool in companies still is Webpack, we'd stick with it during our bootcamp. The argument of "using the most widely used tool" made sense at the time, but it came with a few drawbacks.<br />
Webpack is slow. I remember every time I'd change one line of css I had to wait at least 5 seconds for the whole application to rebundle. It requires to manually refresh the browser every time we make a change. The configuration is complex.<br />
Point is, it's not a very good tool anymore in my opinion.

So after my bootcamp I started looking into alternatives. Importmap was an obvious choice as the new default but I wasn't too keen on using it because of its lack of adoption yet.<br />
Another option was replacing Sprockets with Propshaft and Webpack with esBuild. This seems to become a very popular solution among Rails developers and one that is natively supported by Rails. The only issue is that it does not allow for Hot Module Replacement (HMR) without another gem yet (this might have changed since), and I wanted to have that feature without the need for an additional dependency. That's when I started looking into <a href="https://vitejs.dev/" target="_blank">Vite</a>. Eventually I ended up adding a couple more dependencies for some extra features, and I'll talk about those in this guide, but at this point I knew what the other options were, and it didn't feel like such an issue anymore so I stuck with it.

Vite is becoming a very popular tool in frontend development. It is fast, reliable, and easy to set up. It enables AutoReload when you save your content and Hot Module Replacement (HMR). The only issue is that in a Rails project it relies on a third-party gem, <a href="https://vite-ruby.netlify.app/" target="_blank">Vite Ruby</a>.<br />
Nevertheless, if you wanna give it a try, here's a step-by-step guide on how to create a new project using Vite. For this example we'll also be using Stimulus and Sass for our frontend.

## Creating a new project

First things first, create a new project.<br />
Vite is gonna handle the whole bundling process from now on, which means we won't need a JavaScript bundler during our installation nor will we need to use the Rails' asset pipeline at all.

To create the project run the following command in your terminal.
```bash
rails new --skip-asset-pipeline --skip-javascript YOUR_PROJECT_NAME
```

Once created let's add a couple gems in our `Gemfile`
```ruby [Gemfile]
# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem "turbo-rails"

# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem "stimulus-rails"

# Vite.js integration in Ruby web apps [https://vite-ruby.netlify.app/]
gem "vite_rails"
```

And run `bundle` in your terminal to install the gems.<br />
Before moving on we'll create a `package.json` file, either by running `yarn init` in your terminal or by creating the file yourself and adding the following content inside of it.
```json [package.json]
{
  "name": "app",
  "private": "true",
}
```

Lastly, just to make sure Vite's installer uses yarn in the next step instead of npm, run `yarn` once in your terminal which will generate an empty `yarn.lock` file.

## Installing Vite

Now that the project is created we can now install Vite.
The gem was added to our `Gemfile` and bundled in the previous step so we can now run the following commands
```bash
bundle exec vite install
yarn add -D vite-plugin-full-reload
```

The first one will install Vite in the project from the `vite_rails` gem we installed.<br />
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

Notice that inside our `app` directory, vite_rails also created a new directory called `frontend`. From now on all of our assets and javascript code will be inside this `app/frontend` directory instead of, respectively, being inside the `app/assets` and `javascript` directories.<br />

You can also have a look at your `app/views/layouts/application.html.erb` file where you'll see vite_rails has replaced the initial script tag by a `vite_javascript_tag` and added a new `vite_client_tag`.
That's it.

Vite is installed and ready to run.

## Installing Turbo & Stimulus

Before installing turbo we're gonna have to create our javascript file ourself as we skipped that step when we created the project. (remember the `--skip-javascript` flag in our `rails new` command.)<br />

Let's create a new `app/javascript/application.js` file first, either manually or with
```bash
mkdir -p app/javascript && touch app/javascript/application.js
```
Then you can install Turbo in your project.
```bash
bin/rails turbo:install
```

Once that us done let's install Stimulus too which will create a `app/javascript/controllers` directory and add a few files inside of it.
```bash
bin/rails stimulus:install
```

We now need to move the javascript directory inside our `app/frontend` directory and import it inside our vite entrypoint.<br />
Run
```bash
mv app/javascript app/frontend
```

Then in your `app/frontend/entrypoints/application.js` file you can add this line at the top
```js [app/frontend/entrypoints/application.js]
import "../javascript/application"
```

And finally let's wrap up by enabling Hot Module Replacement (HMR) in Stimulus with another Vite plugin.<br />
Run
```bash
yarn add -D vite-plugin-stimulus-hmr
```

And add
```js [vite.config.js]
...
import StimulusHMR from "vite-plugin-stimulus-hmr"

export default defineConfig({
  plugins: [
    ...
    StimulusHMR()
  ]
})
```

## Installing PostCSS & Sass

<a href="https://postcss.org/" target="_blank">PostCSS</a> is a tool for transforming CSS with JavaScript. It is included with Vite and it will allow us to included utilities like Autoprefixer or Tailwindcss.<br />
Sass is not installed yet though so let's start with that.
```bash
yarn add -D sass autoprefixer
```

Create a `postcss.config.js` file in your root directory, this file will automatically be loaded by Vite and inside of it we'll enable Autoprefixer which will automatically prefix our css to be compatible across browsers.
```js [postcss.config.js]
const autoprefixer = require("autoprefixer")

module.exports = {
  plugins: [
    autoprefixer
  ]
}
```

Now create a `app/frontend/stylesheets/application.scss` file. This will be our main import hub for all of your Sass partials.<br />
We also need to create an entrypoint for Vite so let's add a `app/frontend/entrypoints/application.scss` file to our project and import the newly created file inside this one.
```scss [app/frontend/entrypoints/application.scss]
@import "../stylesheets/application";
```

Finally let's go back to the `app/views/layouts/application.html.erb` file and we'll replace the stylesheet with our new entrypoint.
```erb [app/views/layouts/application.html.erb]
<%# stylesheet_link_tag "application" %>
<%= vite_stylesheet_tag "application.scss" %>
```

Your are now ready to use Sass.

## Wrapping up

And we're done.<br />
Your project is now ready to go.

So, will everything be a smooth ride from now on ? Most of the time, yes.<br />
But as with any third party library there's always the possibility of having some issues.

One that I encountered for example is that you won't be able to use the Stimulus generator command; `bin/rails generate stimulus CONTROLLER_NAME` in your terminal because stimulus is hardcoded to look for a `app/javascript/controllers` directory.<br />
I created a <a href="https://github.com/hotwired/stimulus-rails/pull/119" target="_blank">Pull Request</a> for this specific issue in Stimulus-rails and until it's merged, if it'll ever be, I'm using my fork instead of Stimulus' main repository by replacing the gem in my Gemfile with my github repo.
```ruby [Gemfile]
# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
# Using fork until PR is merged https://github.com/hotwired/stimulus-rails/pull/119
gem "stimulus-rails", github: "wJoenn/stimulus-rails", branch: "main"
```

Once I've reinstalled Stimulus with my fork I can configure a new path for the generator in a new initializer, `config/initializers/stimulus.rb`.
```ruby [config/initializers/stimulus.rb]
Stimulus.configure do |config|
  config.controllers_path = "app/frontend/javascript/controllers/"
end
```

This is just one issue though and later one you or I might find more.

Don't hesitate to read <a href="https://vite-ruby.netlify.app/guide/rails.html" target="_blank">vite_rails' documentation</a> if you're having trouble.
You'll find there the steps needed if you want to deploy on Heroku for example. Or some other helpers than can be used in Rails. Etc.


Anyway that's it for this guide.
Thanks for hanging out here and hopefully you'll adopt Vite in your workflow from now one.

Cheers.
