<template>
  <div id="blog">
    <YoutubeEmbed v-if="showYoutubeEmbed" :src="src" @close="showYoutubeEmbed = false" />

    <ContentDoc ref="content" tag="article" class="content">
      <template #not-found>
        <div ref="notFound" />
      </template>
    </ContentDoc>

    <ResourcePanel v-if="blog?.resources" :resources="blog.resources" />

    <NuxtLink v-if="blog" to="/blogs" class="more"><fai icon="fa-solid fa-chevron-down" /> More blogs</NuxtLink>
  </div>
</template>

<script setup lang="ts">
  import type { Blog } from "~/types"

  definePageMeta({ middleware: ["router"] })

  const route = useRoute()
  const blog = await queryContent(route.path)
    .only(["title", "description", "cover_url", "resources", "_path", "_id"])
    .findOne() as Blog

  useServerSeoMeta({
    ogDescription: blog.description,
    ogImage: `https://louisramos.dev${blog.cover_url}`,
    ogTitle: blog.title,
    ogType: "article",
    ogUrl: `https://louisramos.dev${route.path}`
  })

  const content = ref<HTMLElement | null>(null)
  const notFound = ref<HTMLDivElement | null>(null)
  const showYoutubeEmbed = ref(false)
  const src = ref("")

  const addEventToEmbeds = () => {
    if (!notFound.value) {
      setTimeout(() => {
        const embedButtons = document.querySelectorAll(".embed") as NodeListOf<HTMLButtonElement>
        embedButtons.forEach(button => {
          button.addEventListener("click", (event: MouseEvent) => {
            src.value = (event.currentTarget as HTMLButtonElement).dataset.src!
            showYoutubeEmbed.value = true
          })
        })
      }, 1000)
    }
  }

  watch(notFound, () => { addEventToEmbeds() })

  watch(content, () => { addEventToEmbeds() })
</script>

<style lang="scss">
  #blog {
    margin: 0 auto;
    width: Min(800px, 100%);

    .more {
      @include btn;

      background-color: $light-nuxt-green;
      color: $main-background;
      margin-top: 50px;

      svg {
        transform: rotate(90deg);
      }
    }

    .content {
      font-size: $size-lg;

      code {
        @include code-highlight
      }

      h1 {
        font-size: 40px;
        margin-top: 35px;
      }

      h2 {
        margin: 50px 0 20px;

        a {
          color: $light-nuxt-green;

          &:hover {
            color: $dark-nuxt-green;
          }
        }
      }

      h3 {
        font-size: 25px;
        font-weight: 300;
      }

      img {
        width: 100%;
      }

      p {
        line-height: 35px;
        margin: 30px 0 0;

        &.sidenote {
          color: $secondary-color;
          font-size: $size-sm;
          font-style: italic;
          line-height: $size;
          margin: 0;

          &.mt-20 {
            margin-top: -20px;
          }
        }

        a {
          color: $light-nuxt-green;

          &:hover {
            color: $dark-nuxt-green;
          }
        }
      }

      .embed {
        background-color: transparent;
        border: none;
        color: mediumpurple;
        cursor: pointer;
        font: inherit;
        font-weight: 400;
      }

      .play {
        display: block;
        margin: 20px 0;
        position: relative;

        &::before {
          background-image: url("/images/play.png");
          background-position: center;
          background-size: cover;
          content: "";
          height: 100px;
          left: 50%;
          position: absolute;
          top: 50%;
          translate: -50% -50%;
          width: 100px;
        }
      }
    }
  }
</style>
