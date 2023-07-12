<template>
  <div id="blog">
    <ContentDoc tag="article" class="content" />

    <NuxtLink to="/blogs" class="back"><fai icon="fa-solid fa-rotate-left" /> Back</NuxtLink>
  </div>
</template>

<script setup lang="ts">
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

      pre {
        background-color: #101010;
        border: 1px solid $secondary-color;
        border-radius: 10px;
        padding: 25px 20px 20px;
        margin: 10px 0 30px;

        code {
          border: none;
          padding: 0;
        }

        .line {
          display: flex;
          flex-wrap: wrap;

          span {
            white-space: break-spaces;
          }
        }
      }

      .filename {
        color: #58a458;
        font-size: 0.8rem;
      }
    }
  }
</style>
