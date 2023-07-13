<template>
  <div id="blog">
    <ContentDoc tag="article" class="content" />
    <NuxtLink to="/blogs" class="back"><fai icon="fa-solid fa-rotate-left" /> Back</NuxtLink>
  </div>
</template>

<script setup lang="ts">
  import Blog from "../../types/Blog"

  const route = useRoute()
  const { data: blog } = await useAsyncData("blog", () => (
    queryContent(route.path)
      .only(["title", "description", "cover_url", "_path", "_id"])
      .findOne() as Promise<Blog>
  ))

  useServerSeoMeta({
    ogDescription: blog.value?.description,
    ogImage: `https://louisramos.dev${blog.value?.cover_url}`,
    ogTitle: blog.value?.title,
    ogType: "article",
    ogUrl: `https://louisramos.dev${route.path}`
  })
</script>

<style lang="scss">
  #blog {
    margin: 0 auto;
    width: Min(800px, 100%);

    .back {
      @include btn;

      background-color: $light-nuxt-green;
      color: $main-background;
      margin-top: 50px;
    }

    .content {
      font-size: 1.2rem;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);

      code {
        background-color: black;
        border: 1px solid $secondary-color;
        border-radius: 5px;
        color: rgb(233, 157, 17);
        font-size: 1rem;
        padding: 0.25rem 0.5rem;
        word-break: break-word;
      }

      h1 {
        font-size: 40px;
        margin-top: 50px;
      }

      h2 {
        margin: 50px 0 20px;

        a {
          color: $light-nuxt-green;
        }
      }

      p {
        line-height: 30px;
        margin: 20px 0 0;

        a {
          color: $light-nuxt-green;
        }
      }
    }
  }
</style>
