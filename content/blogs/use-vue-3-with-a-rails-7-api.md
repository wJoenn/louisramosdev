---
  title: Use Vue 3 with a Rails 7 API
  description: How to set up a Vue application with client side state management for our Rails API and authentication
  cover_url: /images/blogs/vue_todo.jpg
  date: 1692108754
  resources:
    - ["Vue documentation", "https://vuejs.org/"]
    - ["Pinia documentation", "https://pinia.vuejs.org/"]
    - ["Using the fetch API", "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"]
---

<img src="/images/blogs/vue_todo.jpg" alt="Vue + Ruby banner" class="cover" width="800">
<p class="sidenote">August 15th 2023</p>

# Use Vue 3 with a Rails 7 API

<h3>How to set up a Vue application with client side state management for our Rails API and authentication.</h3>

In my past two articles, I <a href="/blogs/create-a-rails-7-rest-api" target="_blank">created a Rails 7 REST API</a> that has a `Task` model and a couple CRUD actions to create, destroy and complete a given task or to get a list of all existing tasks, and I <a href="/blogs/rails-api-authentication-with-devise-and-json-web-tokens" target="_blank">added authentication with Devise and JWT</a> to this Rails API.

It's finally time to get this to good use and build our frontend application.

I am a <a href="https://vuejs.org/" target="_blank">Vue</a> dev so that's what I'm gonna go with in this article but I'll try to make it relevant for other frameworks too by talking about the concepts involved in using an API in our client app. I'll also handle Client Side State Management which will help enable our user's state to persist through pages, and Client Side Routing.

Now that the introduction is done, let's get building.

## Creating a Vue app

The simplest way to create a Vue app nowadays, and the simplest way to create an app with any other SPA framework really, is to use <a href="https://www.npmjs.com/package/create-vite" target="_blank">create-vite</a>. This time though, because I know I'll be using some Vue specific packages, <a href="https://router.vuejs.org/" target="_blank">Vue Router</a> and <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a>, I'll use <a href="https://www.npmjs.com/package/create-vue" target="_blank">create-vue</a> instead which can install those for us automatically.

Let's get back inside the `to-do-list` repository, which already contains our Rails API and a couple executable `bin` files, and create a new `client` directory for our Vue app.
```bash
cd to-do-list
npm create vue@3
```

Don't forget to select `Yes` for at least `Vue Router` and `Pinia` during the creation process.
```bash
Vue.js - The Progressive JavaScript Framework

✔ Project name: … client
✔ Add TypeScript? … No
✔ Add JSX Support? … No
✔ Add Vue Router for Single Page Application development? … Yes
✔ Add Pinia for state management? … Yes
✔ Add Vitest for Unit Testing? … No
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? … No

Scaffolding project in path/to/to-do-list/client...

Done. Now run:

  cd client
  npm install
  npm run dev
```

<a href="/blogs/create-a-rails-7-rest-api#creating-the-project" target="_blank">Just like we did in the first article of this serie</a>, we'll create a couple executables inside our `bin` folder to enable us to interact with our `client` directory without having to `cd` in and out of it.

I'll call the first one `bin/vite`, it'll will run any command for our client from our root repository
```bash [bin/vite]
#!/bin/bash

cd client && npm "$@"
```

And another, `bin/dev`, which will be used to run both our Rails server and our Vite server from a single command inside a single terminal with the help of <a href="https://github.com/open-cli-tools/concurrently" target="_blank">Concurrently</a>.
```bash [bin/dev]
#!/bin/bash

if ! npm list -g concurrently >/dev/null 2>&1; then
  echo "Installing Concurrently..."
  npm i --location=global concurrently
fi

echo "Running servers..."
echo "###############################"
concurrently --kill-others -n Rails:,Vite:, -c red,green, "bin/rails s" "bin/vite run dev"
```

We can thel make them executable by modifying their rights.
```bash
chmod +x bin/vite
chmod +x bin/dev
```

You can now install the dependencies for your client app and run both servers with these commands.
```bash
bin/vite install
bin/dev
```

Once you've made it work, you can remove all the boilerplate code from `create-vue` as we'll be writing our own from now on.

## Handling user authentication with State Management

The first thing that'll be asked from us when using the app is to log in, so the first thing we should focus on is to write the logic to authenticate users and persist their sessions.

Most of the time this is done by creating a `Store` that will preserve the data related to the current user and make it consistent and accessible across any area of our application. This method of preserving data inside stores is called `State Management`. The most common way to implement a State Management logic in our frontend apps is to install a dedicated library.

In Vue the officially supported state management library is called <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a> like I mentionned before. It was installed during the creation of our Vue app so we can directly create a new store as `client/src/stores/UserStore.js`.
```js [client/src/stores/UserStore.js]
import { computed, ref } from "vue"
import { defineStore } from "pinia"

const API_URL = "http://localhost:3000"

const useUserStore = defineStore("UserStore", () => {
  // state

  // getters

  // actions
})

export default useUserStore
```

<p class="sidenote mt-20">Pinia can be used with Vue's Option API or Vue's Composition API but the Composition API is the new standard for Vue applications so that's what I used above and will be using across the whole article. If you want to learn more you can check the <a href="https://vuejs.org/guide/extras/composition-api-faq.html" target="_blank">Composition API FAQ</a>.</p>

As you can see we need to define some a `state`, some `getters` and `actions`.

The `state` is the central part of the store so let's start there. It defines the data that will be added to the State of our application and in our case that would be a user Object and the JSON Web Token linked to this user.
```js [client/src/stores/UserStore.js]
...

const useUserStore = defineStore("UserStore", () => {
  // state
  const user = ref(null)
  const bearerToken = ref(null)

  ...

  return { user, bearerToken }
})

...
```

The `getters` are readonly variables computed from our state variables. You might or might not need one in your stores but in the context of this UserStore it'd be nice to have a computed value of whether a user is logged in or not so I'll make one.
```js [client/src/stores/UserStore.js]
...

const useUserStore = defineStore("UserStore", () => {
  ...

  // getters
  const isLoggedIn = computed(() => bearerToken.value !== null)

  ...

  return { ..., isLoggedIn }
})

...
```

Finally the `actions` enable us to change the state of this store. These are used to make your HTTP Request for example, or to reset the state of the Store and whatnot.<br />
Any change you want to apply to the state of a Store is best done through an action.<br />
Let's make a few to register, sign in and sign out our users.
```js [client/src/stores/UserStore.js]
...

const useUserStore = defineStore("UserStore", () => {
  ...

  // action
  const login = formData => postRequest("/users/sign_in", formData)

  const signup = formData => postRequest("/users", formData)

  const postRequest = async (endPoint, formData) => {
    try {
      const params = { user: Object.fromEntries(formData) }
      const response = await fetch(`${API_URL}${endPoint}`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: { "Content-Type": "application/json" }
      })

      const isSuccessful = response.ok
      const data = await response.json()

      if (!isSuccessful) {
        throw new Error(data.messages)
      }

      user.value = data.user
      bearerToken.value = Object.fromEntries(response.headers).authorization
      localStorage.bearerToken = bearerToken.value
    } catch (error) {
      return { error }
    }
  }

  const loginWithToken = async () => {
    const token = localStorage.bearerToken
    const tokenExists = token !== undefined && token !== null

    if (tokenExists) {
      try {
        const response = await fetch(`${API_URL}/current_user`, {
          headers: { Authorization: token }
        })

        if (!response.ok) {
          throw new Error("Invalid Bearer Token")
        }

        const data = await response.json()
        user.value = data.user
        bearerToken.value = token
      } catch (error) {
        console.log(error)
      }
    }
  }

  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/users/sign_out`, {
        method: "DELETE",
        headers: { Authorization: bearerToken.value }
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.messages)
      }

      user.value = null
      bearerToken.value = null
      localStorage.removeItem("bearerToken")
    } catch (error) {
      console.log(error)
    }
  }

  return { ..., login, signup, loginWithToken, logout }
})

...
```

And that's it for our UserStore.

As you can see in the `postRequest` method, everytime a user sucessfully login we save his Bearer token inside its browser's `localeStorage`. This will allow us to attempt to log the user in everytime he revisits the website.

To do that let's go inside the main file of our application, in Vue that would be `src/main.js`, and just before we mount the app to the DOM let's use our `loginWithToken()` method.
```js [client/src/main.js]
import "./assets/main.css"
import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import useUserStore from "./stores/UserStore.js"

const app = createApp(App)

app.use(createPinia())

useUserStore()
  .loginWithToken()
  .then(() => {
    app
      .use(router)
      .mount("#app")
  })
```

Your app will now log your user in everytime the user loads the page as long as he has a valid Bearer token in his localStorage.

Let's not wrap up user authentication with a couple views
```vue [client/src/App.vue]
<template>
  <router-view />
</template>

<script setup>
</script>
```

```vue [client/src/views/Home.vue]
<template>
  <div>
    <h1>To Do List manager app</h1>

    <router-link :to="{ name: 'Logout' }">Log out</router-link>
  </div>
</template>

<script setup>
</script>
```

```vue [client/src/views/Login.vue]
<template>
  <div>
    <nav>
      <router-link :to="{ name: 'Login' }">Login</router-link>
      <router-link :to="{ name: 'Signup' }">Sign up</router-link>
    </nav>

    <form @submit.prevent="handleFormSubmit">
      <label for="email">Email:</label>
      <input type="text" name="email">
      <label for="password">Password:</label>
      <input type="password" name="password">
      <input type="submit" value="Sign in">
    </form>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router"
  import useUserStore from "../stores/UserStore.js"

  const router = useRouter()
  const userStore = useUserStore()

  const handleFormSubmit = async event => {
    const form = event.target
    const formData = new FormData(form)
    const response = await userStore.login(formData)

    if (response?.error) {
      console.log(response.error)
    } else {
      router.push("/")
      form.reset()
    }
  }
</script>

<style scoped>
</style>
```

```vue [client/src/views/Signup.vue]
<template>
  <div>
    <nav>
      <router-link :to="{ name: 'Login' }">Login</router-link>
      <router-link :to="{ name: 'Signup' }">Sign up</router-link>
    </nav>

    <form @submit.prevent="handleFormSubmit">
      <label for="email">Email:</label>
      <input type="text" name="email">
      <label for="password">Password:</label>
      <input type="password" name="password">
      <label for="password_confirmation">Password Confirmation:</label>
      <input type="password" name="password_confirmation">
      <input type="submit" value="Sign in">
    </form>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router"
  import useUserStore from "../stores/UserStore.js"

  const router = useRouter()
  const userStore = useUserStore()

  const handleFormSubmit = async event => {
    const form = event.target
    const formData = new FormData(form)
    const response = await userStore.signup(formData)

    if (response?.error) {
      console.log(response.error)
    } else {
      router.push("/")
      form.reset()
    }
  }
</script>

<style scoped>
</style>
```

And the routes we need to access these views.<br />
While we're in the router we'll also add an auth guard system that will verify whether a user is logged in or not before he can access some pages.
```js [client/src/router/router.js]
import { createRouter, createWebHistory } from "vue-router"
import useUserStore from "../stores/UserStore.js"

import Home from "../views/Home.vue"

const authGuard = (to, next) => {
  const isLoggedIn = useUserStore().isLoggedIn
  const requiresAuth = to.meta.requiresAuth

  if (isLoggedIn && !requiresAuth) return next({ name: "Home" })
  if (!isLoggedIn && requiresAuth) return next({ name: "Login" })

  return next()
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: "/users/sign_in",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false }
  },
  {
    path: "/users/sign_up",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
    meta: { requiresAuth: false }
  },
  {
    path: "/users/logout",
    name: "Logout",
    meta: { requiresAuth: true },
    beforeEnter: async (_to, _from, next) => {
      await useUserStore().logout()
      next({ name: "Login" })
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  authGuard(to, next)
})

export default router
```

A lot of things happened in the last couple code blocks but basically what I did was; I created a login and a signup form which do not require a user to be authenticate to be accessed (obviously) and I created a homepage which we will use later to display our to-do list. Because the `Task` model of our api requires a user, I also added an auth guard to this route so that a visitor would be prompted to log in if he tries to access the homepage.

Now that all of this is done authentication is completly handled by our Vue client app and we can move on to the to-do list itself.

## Adding Task CRUD actions to our homepage

All we have left to do is add a form that will send a POST request to our API to create a new task, make a GET request to display all our existing tasks and make PATCH and DELETE requests to, respectively, complete and destroy a given task with a couple buttons.

We've already tested all the endpoints of our API on Postman when we created them so we know how to make the requests, there shouldn't be any difficulty anymore.
```vue [client/src/views/Home.vue]
<template>
  <div>
    <h1>To Do List manager app</h1>

    <form @submit.prevent="handleFormSubmit">
      <input type="text" name="title" placeholder="Got a new task to do ?">
      <input type="submit" value="Add to list">
    </form>

    <ul>
      <li v-for="(task, index) in sortedTasks" :key="task.id">
        <p>{{ task.title }}</p>
        <p>Task is {{ task.completed ? '' : 'not ' }}completed</p>
        <button @click="completeTask(task.id, index)">Complete</button>
        <button @click="deleteTask(task.id, index)">Delete</button>
      </li>
    </ul>

    <router-link :to="{ name: 'Logout' }">Log out</router-link>
  </div>
</template>

<script setup>
  import { computed, onBeforeMount, ref, toRefs } from "vue"
  import useUserStore from "../stores/UserStore.js"

  const API_URL = "http://localhost:3001"

  const userStore = useUserStore()
  const { bearerToken } = toRefs(userStore)

  const tasks = ref([])
  const sortedTasks = computed(() => tasks.value.sort((a, b) => b.id - a.id))

  const completeTask = async (id, index) => {
    await fetch(`${API_URL}/tasks/${id}/complete`, {
      method: "PATCH",
      headers: { Authorization: bearerToken.value }
    })

    const task = tasks.value[index]
    task.completed = true
  }

  const deleteTask = async (id, index) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: bearerToken.value }
    })

    tasks.value.splice(index, 1)
  }

  const handleFormSubmit = async event => {
    const form = event.target
    const formData = new FormData(form)
    const params = { task: Object.fromEntries(formData) }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          Authorization: bearerToken.value,
          "Content-type": "application/json"
        }
      })

      const isSuccessful = response.ok
      const data = await response.json()

      if(!isSuccessful) {
        throw new Error(data.messages)
      }

      tasks.value.push(data.task)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  onBeforeMount(async () => {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: { Authorization: bearerToken.value }
    })

    const data = await response.json()
    tasks.value = data.tasks
  })
</script>
```
<p class="sidenote mt-20">
  For non Vue users : `ref` is a way to define a reactive variable. This means that if its value is updated it will also update the DOM. `toRefs` is a way to deconstruct a reactive Object into `ref` variables which makes it easier to use. Without `toRefs` we'd need to do `useUserStore().bearerToken` everytime we want to access it. And `computed` is a readonly reactive variable.<br />
  If interested you can read more about Vue's <a href="https://vuejs.org/api/reactivity-core.html#ref" target="_blank">Reactivity API</a>.
</p>

And at long last, here we are with our working Vue on Rails To do list application !

Well... The style is not great I admit but I'll let you work on that part if you wanna. But as far as the rest goes; The API's `TasksControllers` correctly reponds to JSON requests. It safely handles authentication. The client is able to properly deal with authentication and authorization. And it execute CRUD actions to our API as expected.

It might have been a lot to handle on a first try but now that you've done it once you'll see that it end up being nearly the same procedure everytime and you'll quickly get used to it.

Congratulation on following along this serie of articles ! REST APIs are a very common way to build applications nowadays and you can now practice this architecture with confidence.

Cheers
