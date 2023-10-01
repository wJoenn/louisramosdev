<template>
  <ul>
    <li v-for="release in data?.releases" :key="release.id">
      <GithubRelease :release="release" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { GhRelease } from "../../types/api.ts"

  const env = useRuntimeConfig()

  const { data } = await useFetch<{ releases: GhRelease[] }>(`${env.public.apiUrl}/github_releases`, { server: false })
</script>

<style scoped lang="scss">
</style>
