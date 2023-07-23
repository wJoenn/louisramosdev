---
  title: Frontend WebDev, from beginner to developer
  description: A detailed roadmap on every steps required to become a ready for production Frontend Developer
  cover_url: /images/frontend_roadmap.png
  date: 1690038165
---

![Frontend Development banner](/images/frontend_roadmap.png)

# Frontend WebDev, from beginner to developer

### A detailed roadmap on every steps required to become a ready for production Frontend Developer.

Over the past few months I've met a lot of people that wanted to either learn Frontend development from scratch, or switch over from Backend, but wasn't sure where to start and what they should expect to learn along the way.<br />
I talked to some of those about it and ended up building a roadmap that would go over this topic through my discussions with them and I'd like to share it to a broader audience now.

In this article I'll go over what is, in my opinion of course, the best roadmap to follow to learn about everything there is to learn concerning Frontend Web Development from the most basic tool to the most complex.

Along the line you'll see that the name of each tool I mention is highlighted like <button class="embed" data-src="https://youtube.com/embed/j5a0jTc9S10">this one</button>. Clicking on them will reveal a short video explaining what they are and what they do in a relatively concise manner so if you're unsure about some names I mention make sure to click on those.

I'll also share a lot of tutorials from an amazing youtuber called <a href="https://www.youtube.com/@NetNinja" target="_blank">TheNetNinja</a>. He does a lot of tutorial series and I really love his way of teaching stuff so I tend to share his work but feel free to search for any other resource if you want.

## Vanilla Roadmap

In this first section we'll go over the underlying languages for everything else and a couple more tools that we can learn before tackling on bigger ones like Frameworks and such.<br /><br />

### 1. <button class="embed" data-src="https://youtube.com/embed/ok-plXXHlWw">HTML</button> & <button class="embed" data-src="https://youtube.com/embed/OEV8gMkCHXQ">CSS</button>

These are the first things to learn.

<button class="embed" data-src="https://youtube.com/embed/ok-plXXHlWw">HTML</button> stands for "HyperText Markup Language." It is the fundamental building block of the web and is used to create the structure and content of web pages. If a web application was a body, <button class="embed" data-src="https://youtube.com/embed/ok-plXXHlWw">HTML</button> would be its skeleton. One other important thing about <button class="embed" data-src="https://youtube.com/embed/ok-plXXHlWw">HTML</button> is `accessibility`. Simply put, "accessibility" means making your website as user friendly for any visitor as possible.

<button class="embed" data-src="https://youtube.com/embed/OEV8gMkCHXQ">CSS</button>, for "Cascading Style Sheet", on the other hand would be the skin and make up of this body. It allows us to apply nearly any style to our websites. Later on I'll mention a couple libraries that allow you to apply <button class="embed" data-src="https://youtube.com/embed/OEV8gMkCHXQ">CSS</button> to your applications in a different way but you have to understand that the better your understanding of Vanilla <button class="embed" data-src="https://youtube.com/embed/OEV8gMkCHXQ">CSS</button> is, the more efficient you will be with any of those tools so make sure to learn as much as you can, especially `flex` and `grid` display propreties.

You can click on the following picture to access <a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G" target="_blank">TheNetNinja's HTML & CSS Crash Course</a>.
<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9ivBf_eKCPIAYXWzLlPAm6G" target="_blank">
  <img src="https://img.youtube.com/vi/hu-q2zYwEYs/maxresdefault.jpg" alt="HTML & CSS Crash Course Tutorial youtube serie from TheNetNinja">
</a><br /><br /><br />

### 2. <button class="embed" data-src="https://youtube.com/embed/DHjqpvDnNGE">JavaScript</button>

<button class="embed" data-src="https://youtube.com/embed/DHjqpvDnNGE">JavaScript</button> is the muscle of your web application. This is the programming language that will handle everything for you to build dynamic and interactive applications so a good understanding of it is mandatory.

Beyond stuffs like `DOM manipulation` and `event handling`, you should also know about `ES6` syntax, like arrow functions, and delve into `asynchronousity` (this is a term that means doing stuff outside of the normal flow of the code), especially using `async` and `await`. Finally <button class="embed" data-src="https://youtube.com/embed/DHjqpvDnNGE">JavaScript</button> can also be used as a `OOP` language so you should learn about Classes.<br /><br />

<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9haFPT7J25Q9GRB_ZkFrQAc" target="_blank">
  <img src="https://img.youtube.com/vi/iWOYAxlnaww/maxresdefault.jpg" alt="Modern JavaScript Tutorial youtube serie from TheNetNinja">
</a>

TheNetNinja also has a <a href="https://netninja.dev/p/modern-javascript-from-novice-to-ninja" target="_blank">paid version</a> that includes the videos above and double more including more complex concepts like `OOP` and `modules` which cost 10$. I really recommend you to dive deeply into Vanilla <button class="embed" data-src="https://youtube.com/embed/DHjqpvDnNGE">JavaScript</button> before attempting to go any further because nearly everything from now on relies on your understanding of it. That's why I would take the full course if I were you but there's many other resources where you can learn this. What matters is that you take your time learning <button class="embed" data-src="https://youtube.com/embed/DHjqpvDnNGE">JavaScript</button> in details.<br /><br /><br />

### 3. <button class="embed" data-src="https://youtube.com/embed/qgRUr-YUk1Q">JavaScript Modules</button>

At this point you're basically done with Vanilla so you're gonna have to delve into <button class="embed" data-src="https://youtube.com/embed/qgRUr-YUk1Q">JavaScript Modules</button>.


That means getting to know what tools like `npm` or `yarn` are.<br />
This part is more about reading a couple articles to understand what package managers are and what's the difference between the two I mentionned. The main points are to understand how to install a node package and to understand that you must not use both `npm`and `yarn` in the same project. You either stick to one or the other.<br /><br /><br />

### 4. <button class="embed" data-src="https://youtube.com/embed/5IG4UmULyoA">Bundlers</button>

At this point you should learn what `Webpack` is, what it does and why we need it. Being able to setup a project with webpack is nice too but to be honest with you I wouldn't bother with that because nowadays, although it's still being used a lot, `Webpack` isn't as interesting or performant compared to new stuff.

Look into what other <button class="embed" data-src="https://youtube.com/embed/5IG4UmULyoA">bundlers</button> there are, just learn about the names like `Parcel`, `esBuild` and `Rollup` but more importantly learn about <button class="embed" data-src="https://youtube.com/embed/KCrXgy8qtjM">Vite</button>.

<button class="embed" data-src="https://youtube.com/embed/KCrXgy8qtjM">Vite</button> is the up and coming norm for frontend development. A lot of framework uses that as their default bundler now and you should start using that too.
Learn how to create a new project with Vite, it's really not complicated and it'll be the foundation of every new project you make for a while.

Quick note but if you keep following along this roadmap and wanna learn some of the tools I mention, make sure to always use <button class="embed" data-src="https://youtube.com/embed/KCrXgy8qtjM">Vite</button>. The tutorials probably won't because it's relatively new but you should definitely make sure to use this tool all the time instead even if it means deviating a bit from the tutorial.<br /><br /><br />

### 5. CSS Libraries

The most commonly known CSS library is called `Bootstrap` but honestly, scrap it. It's easy to pick up and that's why new developers like it but it's very restrictive and it teaches you how not to learn CSS which will become a problem.

Learn what <button class="embed" data-src="https://youtube.com/embed/WhCXiEwdU1A">PostCSS</button> is. Again just some article reading to understand the concept of it but you won't really need to do anything because it's included in Vite already.

After you learn about <button class="embed" data-src="https://youtube.com/embed/WhCXiEwdU1A">PostCSS</button>, it's time to get into <button class="embed" data-src="https://youtube.com/embed/akDIJa0AP5c">Sass</button> and to learn about the most widely used CSS library : <button class="embed" data-src="https://youtube.com/embed/mr15Xzb1Ook">TailwindCSS</button>.

<button class="embed" data-src="https://youtube.com/embed/mr15Xzb1Ook">TailwindCSS</button> is a tool you have to master when working as a frontend dev. It's basically like `Bootstrap` because it uses classes in your HTML but it's a lot more modular. It's easy to pick up once you know CSS and it has a great documentation where you can just type what you're looking for and it'll give you the classes you need to use.<br /><br />

<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9jxJX7vojNVK-o8ubDZEcNb" target="_blank">
  <img src="https://img.youtube.com/vi/_kqN4hl9bGc/maxresdefault.jpg" alt="Sass Tutorial youtube serie from TheNetNinja">
</a><br /><br />

<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9gpXORlEHjc5bgnIi5HEGhw" target="_blank">
  <img src="https://img.youtube.com/vi/bxmDnn7lrnk/maxresdefault.jpg" alt="TailwindCSS Tutorial youtube serie from TheNetNinja">
</a><br /><br /><br />

### 6. <button class="embed" data-src="https://youtube.com/embed/Dkx5ydvtpCA">Rendering Patterns</button>

We'll soon get into JavaScript frameworks but first you need to understand what a rendering pattern is and what the different rendering patterns are.

At this point you will probably have an idea of what a `static page` is but acronyms such as `MPA`, `SPA` and `SSR` should ring a bell too. Especially `SPA` because that's what you'll be getting into next.<br />
It's just theory again here, read a couple articles and stuff like that to understand the concepts.<br /><br /><br />

### 7. Deployment

Deployment is the final step of this Vanilla Roadmap.<br />
There are multiple solutions to deploy Frontend Application. The first one is `Github`, it is the easiest one to use and it's a tool you'll probably already have in your workflow so it doesn't require much configuration.<br />
Bear in mind that `Github Pages` only allow you to deploy static pages websites and is not fitted for more complex applications.

The next two are `Netlify` and `Vercel`. I don't have much to say about them, they are great, very well known, both very appreciated. I don't have experience with `Vercel` personally but I've used `Netlify` on some projects and it's always been very easy to setup for me.

## Frameworks Roadmap

At this point you have access to a fairly good Vanilla JavaScript stack that allows you to create simple Static Pages websites. I haven't mentioned it anywhere yet but I strongly advice you to use a `linter` like `esLint` which will enforce quality and good practices in your Javascript code.

Now's finally time to get into JavaScript frameworks !<br />
There are a lot of solutions here and the one that fits you the most will depend on your preference or your region. Your first choice should be among <button class="embed" data-src="https://youtube.com/embed/Tn6-PIqc4UM">React</button>, <button class="embed" data-src="https://youtube.com/embed/nhBVL41-_Cw">Vue.js</button> or <button class="embed" data-src="https://youtube.com/embed/Ata9cSC2WpM">Angular</button>. They are the most widely used and tbh the only ones that have a professional demand.

How to choose between them then ?<br />
The first thing would be to have a glance at each and see if one catches your eye or not. If you don't see anything that seems to be more interesting than the rest then the other solution is just to see what's in higher demand in your area. Most often than not that'll mean <button class="embed" data-src="https://youtube.com/embed/Tn6-PIqc4UM">React</button>.

I'm a <button class="embed" data-src="https://youtube.com/embed/nhBVL41-_Cw">Vue.js</button> dev so that's what I'm gonna go with for the rest of this article but any tool I'll mention further down will have its equivalent for other frameworks and it'll be easy for you to figure them out.<br /><br /><br />

### 8. <button class="embed" data-src="https://youtube.com/embed/nhBVL41-_Cw">Vue.js</button>

<button class="embed" data-src="https://youtube.com/embed/nhBVL41-_Cw">Vue</button> is a JavaScript SPA framework. Like any other framework it has a unique directory structure and an extended JavaScript syntax to build more complex application easily.

If you decide to watch the following tutorial there are two things to keep in mind because it's 2 years old and it is becoming a bit old.

The first one is that even if the tutorial doesn't, you should always use Vite to create your applications.

The second one is that <button class="embed" data-src="https://youtube.com/embed/nhBVL41-_Cw">Vue</button> has a new convention called `script setup` that did not exist back when the tutorial was made. Make sure to catch up to this once you've finished learning the basics because it's how every <button class="embed" data-src="https://youtube.com/embed/nhBVL41-_Cw">Vue</button> applications are made now.<br /><br />

<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1" target="_blank">
  <img src="https://img.youtube.com/vi/YrxBCBibVo0/maxresdefault.jpg" alt="Vue 3 for beginners youtube serie from TheNetNinja">
</a>

Again, TheNetNinja also has a more complete <a href="https://netninja.dev/p/build-websites-with-vue-3-firebase" target="_blank">paid version</a> of this tutorial and also dabs into <button class="embed" data-src="https://youtube.com/embed/vAoB4VbhRzM">Firebase</button> which is a tool I'll talk about soon. In this paid version he goes over more complex features and builds a few small projects, it's very well made so I recommend this one too.<br /><br />

### 9. Routing

This is pretty straightforward, it basically means "how to go from one page to another" in your website.<br />
The routing library for Vue is called <button class="embed" data-src="https://youtube.com/embed/nKg_p89Hzos">Vue-Router</button> and you'll have learned about it already if you followed the previous tutorial.<br /><br />

### 10. State Management

I won't go into too much details as to what state management is because it wouldn't make much sense at this point but once you reach this step you'll probably understand what it is and you might have delved into it a bit a already. In just a few words though, State Management means preserving data across multiple pages in your application.


The most known library for state management in Vue.js is called `VueX` but it's not commonly used anymore. Nowadays the best solution for a state management library for Vue is <button class="embed" data-src="https://youtube.com/embed/LfWpPRId5N0">Pinia</button>. It's easier to use and has become the officially supported state management library for Vue so you should definitely go with this one.<br /><br />

<a href="https://www.youtube.com/watch?v=u0B9dysw29A&list=PL4cUxeGkcC9hp28dYyYBy3xoOdoeNw-hD" target="_blank">
  <img src="https://img.youtube.com/vi/u0B9dysw29A/maxresdefault.jpg" alt="Pinia Crash Course youtube serie from TheNetNinja">
</a><br /><br /><br />

### OPTIONNAL : Backend as a Service

What it means is basically having a whole backend, including database, as a tool already made instead of making your own.<br />
A BaaS isn't mandatory but it's a very good tool to learn at this point to be able to work on "full stack" projects on your own.

<button class="embed" data-src="https://youtube.com/embed/vAoB4VbhRzM">Firebase</button> is the most popular one but it's made by google and it tries to lock you in their environment which you might or might not agree with.<br />
If you bought TheNetNinja's <a href="https://netninja.dev/p/modern-javascript-from-novice-to-ninja" target="_blank">JavaScript Course</a> or <a href="https://netninja.dev/p/build-websites-with-vue-3-firebase" target="_blank">Vue.js Course</a> then you'll already have some knowledge of <button class="embed" data-src="https://youtube.com/embed/vAoB4VbhRzM">Firebase</button>.


<button class="embed" data-src="https://youtube.com/embed/zBZgdTb-dns">Supabase</button> is a very popular alternative to <button class="embed" data-src="https://youtube.com/embed/vAoB4VbhRzM">Firebase</button> and I would personally reccommend going with that one instead but that's because I want to avoid using big companies', like Google or Facebook, techs to avoid encouraging monopoles so make that choice your own. Supabase also is Open Source which is nice.

Being able to use one of those will not really help you in a real company because they generally have fully built Backend solutions but, as I said, they provide you with a great way to work on personnal projects as a Frontend only developer, and in reality they can scale up pretty far so they should be all you need on a personnal level for a long time.<br /><br />

<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb" target="_blank">
  <img src="https://img.youtube.com/vi/9zdvmgGsww0/maxresdefault.jpg" alt="Getting Started with Firebase 9 youtube serie from TheNetNinja">
</a><br /><br />

<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9hUb6sHthUEwG7r9VDPBMKO" target="_blank">
  <img src="https://img.youtube.com/vi/ydz7Dj5QHKY/maxresdefault.jpg" alt="Supabase Tutorial youtube serie from TheNetNinja">
</a>

## Advance Roadmap

You know have access to a much more complete tech stack and at this point you can safely start looking for jobs with your current knowledge if that's what you're aiming at.

Right now is a good place to take a break before learning new stuffs.<br />
Make a couple small projects, get familiar with this stack if you feel the need to and you can continue with the rest once you feel ready to.

There are still a couple more tools that you should definitely look into at some point though. They are tools that you will have probably seen by name in some articles or in some job posts by now and it's finally time to dive into them.<br /><br />

### 11. <button class="embed" data-src="https://youtube.com/embed/zQnBQ4tB3ZA">TypeScript</button>

<button class="embed" data-src="https://youtube.com/embed/zQnBQ4tB3ZA">TypeScript</button> is a language build on top of JavaScript to add `static type checking`.

To give you a quick example, in JavaScript you could have the following
```js
let variable = 1
number = "1"
```

JavaScript won't raise any error although you're changing the `type` of the variable from a number to a string. This could create issues in your code later on but you wouldn't know until it's too late.

<button class="embed" data-src="https://youtube.com/embed/zQnBQ4tB3ZA">TypeScript</button> fixes that issue by assigning a static type to your variables. Now if you try to change the value of a variable with a new value that doesn't fit the required type it will raise an error and force you fix that on the spot which is a lot safer.
```ts
let variable: number = 1
variable = "1" // This is not possible
```

<button class="embed" data-src="https://youtube.com/embed/zQnBQ4tB3ZA">TypeScript</button> is becoming very widely used in Frontend Development so you will have to become familiar with it and now is a very good time for that.<br /><br />

<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI" target="_blank">
  <img src="https://img.youtube.com/vi/2pZmKW9-I_k/maxresdefault.jpg" alt="TypeScript Tutorial youtube serie from TheNetNinja">
</a><br /><br /><br />

### 12. Meta-Framework

You'll understand what they are along your learnings but in just a few words : They enable `Server Side Rendering` which improves `Search Engine Optimization` as well as include some cool utilities to your current JavaScript framework to improve Developer Experience.

Vue.js' Meta-Framework is called <button class="embed" data-src="https://youtube.com/embed/dCxSsr5xuL8">Nuxt</button><br /><br />

<a href="https://www.youtube.com/playlist?list=PL4cUxeGkcC9haQlqdCQyYmL_27TesCGPC" target="_blank">
  <img src="https://img.youtube.com/vi/GBdO5myZNsQ/maxresdefault.jpg" alt="Nuxt 3 Crash Course youtube serie from TheNetNinja">
</a><br /><br /><br />

### 13. <button class="embed" data-src="https://youtube.com/embed/u6QfIXgjwGQ">Testing</button>

<button class="embed" data-src="https://youtube.com/embed/u6QfIXgjwGQ">Testing</button> is another thing that you'll eventually get into.

It's not as widely practiced in Frontend development as in Backend development but it's still a very important skill to get.<br />
There are multiple testing patterns and you should understand what they are and when to use which. Once that's done you can start writting your first tests with `Jest` (the more popular unit testing tool for JavaScript) or <button class="embed" data-src="https://youtube.com/embed/7f-71kYhK00">Vitest</button> (a newcomer made by the same team as Vite and Vue.js that hasn't reached it's version 1 yet but is expected to take over Jest in the future). Both are very similar so I would personnaly go with <button class="embed" data-src="https://youtube.com/embed/7f-71kYhK00">Vitest</button> and you'll still be able to use Jest if you need to later.

Once you've wrote some unit and integrations tests, you can also get into End to End testing, e2e for short.
There are two candidates here, <button class="embed" data-src="https://youtube.com/embed/BQqzfHQkREo">Cypress</button> and <button class="embed" data-src="https://youtube.com/embed/SW3TqvhrzU4">Playwright</button>.<br /><br />

<a href="https://www.youtube.com/watch?v=Jv2uxzhPFl4" target="_blank">
  <img src="https://img.youtube.com/vi/Jv2uxzhPFl4/maxresdefault.jpg" alt="Start testint with JavaScript youtube video from Firebase">
</a><br /><br /><br />

And that's it for this Roadmap. What a ride, huh ?!

If you've reached this point you officially have all the tools you need to become a fully functionnal Frontend Developer, congrats !<br />
It can look like a lot of stuff to go through but in reality if you're motivated this could all be done in a couple month or so really. Remember that you don't need to be an expert in everything, just being able to work with those tools is enough to complete most projects or to get any Junior position Frontend Jobs.

There's more you can do at this point of course but once you've reached this level you'll be as knowledgeable as I currently am so I'm sure you'll be able to figure things out from now on.

One last thing :<br />
If you wanted you could now get into another JS framework completely ! You know enough to get a job already so you could get into any other framework if you're interested like Qwik, Solid or Svelte. Anything goes and learning a new framework will teach you more about your current one too.

You could also try a new language completely. Learning new languages teaches you more about programming as a whole and in my opinion the more you do the better you get even if it's not the exact same thing you'll be using. Concepts stay more or less the same.

You could also go in the opposite direction and learn more about web designs, UI, UX etc.<br />
Being proficient with Figma if you aren't already for example.

The point is that at this points there isn't any tool that you could add to your stack so you could stop there if you wanted but you could also keep learning new stuff. From now on it's open bar.<br />
Be curious !
