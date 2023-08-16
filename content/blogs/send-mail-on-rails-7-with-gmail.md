---
  title: Send mail on Rails 7 with Gmail
  description: Step by step instructions on how to send mail with your gmail address from your Ruby on Rails application using ActiveMailer.
  cover_url: /images/blogs/rails_mailer.png
  date: 1689591384
  resources:
    - ["Action Mailer Basics", "https://guides.rubyonrails.org/action_mailer_basics.html"]
    - ["Active Job Basics", "https://guides.rubyonrails.org/active_job_basics.html"]
    - ["Securing Rails Applications - Environmental Security", "https://edgeguides.rubyonrails.org/security.html#environmental-security"]
---

<img src="/images/blogs/rails_mailer.png" alt="RoR + Gmail banner" width="800">
<p class="sidenote">July 17th 2023</p>

# Send mail on Rails 7 with Gmail

<h3>How to send mail with your gmail address from your Ruby on Rails application using ActiveMailer.</h3>

I was trying to implement Rails' ActiveMailer to send mail from a project of mine with my gmail address and I was surprised how what should have been a simple task ended up being a pain in the ass just because I couldn't find a recent and detailed enough guide on how to enable SMTP mailing with Rails.

I've figured it all out since and I've been asked a couple times to explain the process already so I thought I might as well get all of that into a blog that'd be easier to share in the future.

In this guide we'll enable Gmail to be able to send mail from your app with your gmail address. We'll configure Rails to be able to use this gmail address and we'll create a test mailer to make sure everything works.

At the end of the guide I'll also go over how to use an alias with your gmail address like the redirect address that comes from any Namecheap domain you buy for example.

## Enabling Gmail to be used from your Rails app
The first thing is gonna be to create an app password in our gmail account to be able to log in from our website to send mail.<br />
We need to go to that account and access our account settings by clicking on our avatar in the top right corner then on `Manage your Google Account`

It is a requirement so let's verify that 2-Step Verification is enabled; From the account management home page click on `Security` in the navigation bar on the left of the screen. Then under "How to sign in to Google" make sure "2-Step Verification" is enabled and if not, enable it.

We'll then need to access the app password page for our account. From the "Security" tab, under "How to sign in to Google", click on `2-Step Verification`. Once there scroll at the bottom of the page and you'll find a `App passwords` button.<br />Click it.

When prompted to select an app, choose `Other (Custom name)` and enter your app's name or any other name you wanna use that'll make it easy for you to remember what this is for.<br />
Then click on `generate` and we'll be given a password of 16 characters. Copy it and keep it somwehere for a minute. We'll need this when setting up our Rails application.

That's all for gmail settings, now we can go over to Rails

## Storing our Google credentials safely

The second step will be to store your Gmail credentials in your Rails application.<br />
You can use dotenv variables for that but I recommend using `Rails credentials` instead.<br />
Rails credentials is an encrypted file that exist in your config folder. The file can only be opened from the terminal and requires the presence of the correct `master.key` file in your project (If you have one already you'll find it inside your `config` directory).

The master.key must not be pushed to git or github, just like you wouldn't push the `.env` file, that means that if you share this project with other people you'll need to give them the master.key so that they can access these encrypted credentials.<br />
The `config/credentials.yml.enc` can and should be pushed to git and github on the other hand. It is encrypted so it's perfectly fine to share.

The reasons I prefer this over dotenv variables is that everytime you add a new variable to your `.env` file you have to send it to your team, whereas in the case of Rails credentials you only share the `master.key` once and because all the credentials are pushed to github inside the encrypted file it means they'll automatically have access to the new ones as long as they update their master branch.<br />
Rails credentials is also a built in Rails tool whereas dotenv relies on a third party gem and in my opinion that's another benefit.

It also relies on a yml file to store the crendentials which allows for a way better file organization with comments, indentation etc if you need it.

Finally, but I have no proof of that so that might be more of a placebo, I suspect that encrypted credentials are safer than dotenv variables.

There are multiple way to open this encrypted file but I find the more convient method to be relying on VSCode's decryption interface. Here's a breakdown of how to add credentials to your Rails encrypted file using that method :<br />
Open a terminal for your current repository.<br />
Run the command `EDITOR="code --wait" rails credentials:edit`.<br />
This will open a `yml` file in VSCode where you should see at least a `secret_key_base` key and its value.
In there add your email address and the gmail app password that you just generated like so
```yaml [xxxx.credentials.yml]
gmail:
  address: YOUR_GMAIL_ADDRESS
  password: YOUR_APP_PASSWORD
```

Once that's done you can close the file and it'll save automatically.
You can now access these key from your code by writting `Rails.application.credentials.gmail.address` or `Rails.application.credentials.gmail.password`

## Configuring ActionMailer

Finally to configure Rails with SMTP, we have to go inside our `config/environments` directory and add a configuration to each files.

```ruby [config/environment/production.rb]
config.action_mailer.delivery_method = :smtp
config.action_mailer.default_url_options = { host: YOUR_WEBSITE_URL }

# SMTP settings for Gmail
config.action_mailer.smtp_settings = {
  address: "smtp.gmail.com",
  port: 587,
  user_name: Rails.application.credentials.gmail.address,
  password: Rails.application.credentials.gmail.password,
  authentication: "plain",
  enable_starttls_auto: true
}
```

```ruby [config/environment/development.rb]
config.action_mailer.delivery_method = :smtp
config.action_mailer.default_url_options = { host: "localhost:3000", protocol: "http" }

# SMTP settings for Gmail
config.action_mailer.smtp_settings = {
  address: "smtp.gmail.com",
  port: 587,
  user_name: Rails.application.credentials.gmail.address,
  password: Rails.application.credentials.gmail.password,
  authentication: "plain",
  enable_starttls_auto: true
}
```

```ruby [config/environment/test.rb]
config.action_mailer.delivery_method = :test
config.action_mailer.default_url_options = { host: "localhost:3000", protocol: "http" }
```

If you don't want to keep sending real mail from your dev environment you can change the `config.action_mailer.delivery_method` value from `:smtp` to `:test` anytime. Just make sure everything works fine beforehand.

The last configuration we need to do before testing it is to go to our `app/mailer/application_mailer.rb` file and change the `default from:` value to something like this
```ruby [app/mailer/application_mailer.rb]
class ApplicationMailer < ActionMailer::Base
  default from: "Louis <contact@louisramos.dev>"
  layout "mailer"
end
```

What the default from mean is that now the email received from your Rails application will be named as "Louis" instead of the raw gmail address. If you want to use your company's name that's perfectly alright too of course. Whatever you wanna address yourself as.

## Testing our Rails application

We'll create a new Mailer to test that everything works proprelly.<br />
First, generate a new mailer that we'll call test with the Rails' generator
```bash
bin/rails generate mailer example
```

This will generate a few files. The first one we'll look at is the mailer itself that you'll find in `app/mailers/example_mailer.rb`.<br />
We'll create a simple method inside this currently blank mailer to send a "Hello World" to the email of your choice.
```ruby [app/mailers/example_mailer.rb]
class ExampleMailer < ApplicationMailer
  def hello_world(contact)
    @contact = contact
    mail(to: @contact, subject: 'This is an example mail')
    # The subject will be the subject of the email being sent
  end
end
```

Next we'll create a template for this action in the mailer directory that was generated in `app/views/example_mailer`.<br />
Create a `hello_word.html.erb` file in there (the name has to be same as your mailer's action) and add a little templating inside of it. Notice that because we initialized an instance variable inside our `ExampleMailer#hello_world` action we are now able to access it from the template
```erb [app/views/example_mailer/hello_world.html.erb]
<h1>Hello World</h1>
<p>This email was sent to <%= @contact %>
```

You can preview this email by going to the `test/mailers/previews/example_mailer_preview.rb` file and add a method in it that calls your mailer's action
```ruby [test/mailers/previews/example_mailer_preview.rb]
class ExampleMailerPreview < ActionMailer::Preview
  def hello_world
    ExampleMailer.hello_world("user@example.com")
  end
end
```
Then follow the url at the top of this file which will probably be `http://localhost:3000/rails/mailers/example_mailer` and you'll have a preview of this mail's template.

Now for the actual test open your Rails' console and use the ExempleMailer action we created
```bash
bin/rails console
...
Loading development environment (Rails 7.0.4.2)
irb(main):001:1> ExampleMailer.hello_world(YOUR_CHOSEN_EMAIL_ADDRESS).deliver_now
```

And once you press enter, the email address you entered should receive the hello world email.<br />
That's it, your Rails application can now send mail with your gmail account.

There are two things that can be done from now.<br />
The first one is to set up a asynchronous workflow to your app to be able to deliver emails as background jobs instead of forcing the users to wait until their mail have been sent. With a very small website this wouldn't really matter but with websites like Twitter for example, they send thousands of emails per day so it would be unreasonable for people to wait in a queue until theirs is proprelly sent.<br />
I won't tackle background jobs in this guide but if you wanna do that you can look into `Sidekiq` or `Good_Job` which are two gems that can do that. Once set up you can send your email asynchronously by using `#deliver_later` instead of `#deliver_now`.

The second thing we can do is use your redirect address as an alias to your gmail address so that people receive mail from your alias and can send mail to your alias instead of the original name of your address.

## Changing Gmail's alias

Once you have a working redirect address, navigate to your gmail address and click on the `settings` button that looks like a gear in the top right corner then select `See all settings`.<br />
Click on the `Accounts and Imports` tab at the top and you'll see a `Send mail as` field.
Click on `Add another email address`, enter the name you want your mail to be sent as (That could be your company's name for example) and your redirect email address.<br />
Tick the `Treat as an alias` checkbox and click on `Next Step`

You'll then be asked to enter a SMTP Server, your username and your password. The SMTP Server field should already be completed with `aspmx2.googlemail.com` and `Port: 587`, they are Gmail's default and you can leave them like this.
Use your redirect email address as the username and use the App Password you created for your website (which should be inside your Rails credentials if you followed along my guide) and click on `Add Count`.

If it worked you'll now have 2 email addresses in your "Send mail as section". You can then change the default to use the new alias and from now on people will be able to send mail to your redirect address wich you will receive on your gmail account, and when you send mail with that gmail account people will receive them addressed as the name and address you chose for this alias.

That's it for this guide. You've now managed to setup your Rails application to use ActionMailer with your gmail account. You've also seen how to create a new mailer action and its template. Finally you've also tried this template by previewing it in your dev environment.<br />
Cheers.
