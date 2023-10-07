<template>
  <div id="hub">
    <ClientOnly>
      <ul v-if="isLoggedIn">
        <li v-for="item in data?.releases" :key="item.id">
          <component :is="feedComponent(item.feed_type)" :item="item" />
        </li>
      </ul>

      <form v-else @submit.prevent="login">
        <input v-model="password" type="text">
      </form>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import { GhRelease } from "../../types/api/Github.ts"

  const env = useRuntimeConfig()

  const { data } = await useFetch<{ releases: GhRelease[] }>(`${env.public.apiUrl}/github/releases`, { server: false })

  const password = ref("")
  const isLoggedIn = inject<Ref<boolean>>("isLoggedIn")

  const feedComponent = (feedType: "GithubRelease") => {
    switch (feedType) {
    case "GithubRelease": return resolveComponent("GithubRelease")
    default: return ""
    }
  }

  const login = () => {
    if (password.value === env.public.password) {
      localStorage.isLoggedIn = "true"
      if (isLoggedIn) { isLoggedIn.value = true }
    } else {
      password.value = ""
    }
  }
</script>

<style scoped lang="scss">
  #hub {
    width: 100%;

    form {
      align-items: center;
      display: flex;
      height: 100%;
      justify-content: center;
      width: 100%;

      input {
        background-color: $secondary-background;
        border: $border-dark;
        border-radius: 5px;
        box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.5);
        color: inherit;
        font: inherit;
        font-size: $size-lg;
        padding: $padding;
        width: 500px;
        transition: box-shadow 0.3s ease;

        &:focus {
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.5);
          outline: none;
        }
      }
    }
  }
</style>
