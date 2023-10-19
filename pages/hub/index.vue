<template>
  <div id="hub">
    <ClientOnly>
      <ul v-if="isLoggedIn">
        <li v-for="item in feedItems" :key="item.id">
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
  import type { GhFeedItem } from "../../types/api/Github.ts"

  const env = useRuntimeConfig()

  const isLoading = ref(false)
  const password = ref("")
  const isLoggedIn = inject<Ref<boolean>>("isLoggedIn")
  const hasReachedLastPage = ref(false)
  const feedItems = ref<GhFeedItem[]>([])
  const fromDate = computed(() => feedItems.value.at(-1)?.released_at || new Date())

  const feedComponent = (feedType: GhFeedItem["feed_type"]) => {
    switch (feedType) {
    case "GithubComment": return resolveComponent("GithubComment")
    case "GithubRelease": return resolveComponent("GithubRelease")
    default: return feedType
    }
  }

  const loadFeedItems = async () => {
    isLoading.value = true

    await nextTick()
    const { data } = await useFetch<{ feed_items: GhFeedItem[] }>(
      `${env.public.apiUrl}/feed_items?from_date=${fromDate.value}`,
      { server: false }
    )

    if (data.value) {
      if (data.value.feed_items.length < 10) { hasReachedLastPage.value = true }
      feedItems.value = feedItems.value.concat(data.value.feed_items)
    }
    isLoading.value = false
  }

  const loadNewPage = async (event: Event) => {
    const app = event.target as HTMLDivElement
    if (app.scrollHeight - app.scrollTop < 2500 && !isLoading.value && !hasReachedLastPage.value) {
      await loadFeedItems()
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

  onMounted(async () => {
    await loadFeedItems()

    const app = document.querySelector("#app") as HTMLDivElement
    app.addEventListener("scroll", loadNewPage)
  })
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
