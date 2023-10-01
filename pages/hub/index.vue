<template>
  <div id="hub">
    <ClientOnly>
      <ul v-if="isLoggedIn">
        <li v-for="release in data?.releases" :key="release.id">
          <GithubRelease :release="release" />
        </li>
      </ul>

      <form v-else @submit.prevent="login">
        <input v-model="password" type="text">
      </form>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import { GhRelease } from "../../types/api.ts"

  const env = useRuntimeConfig()

  const { data } = await useFetch<{ releases: GhRelease[] }>(`${env.public.apiUrl}/github_releases`, { server: false })

  const password = ref("")
  const isLoggedIn = inject<Ref<boolean>>("isLoggedIn")

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
        border: 1px solid $ternary-background;
        border-radius: 5px;
        box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.8), 0 0 15px rgba(0, 0, 0, 0.5);
        color: inherit;
        font: inherit;
        font-size: 1.2rem;
        padding: 0.5rem 1rem;
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
