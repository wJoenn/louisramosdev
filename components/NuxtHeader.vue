<template>
  <header>
    <div class="container">
      <div class="logo">
        <div><div /></div>
        <div><div /></div>
      </div>

      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/blogs" :class="{ current: isBlog }">Blogs</NuxtLink>
        <NuxtLink to="/stack">Stack</NuxtLink>
        <NuxtLink v-if="isFeed" to="/feeds" :class="{ current: isFeed }">Feeds</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  const isBlog = inject("isBlog")
  const isFeed = inject("isFeed")
</script>

<style scoped lang="scss">
  @mixin flex-20 {
    align-items: center;
    display: flex;
    gap: 20px;
  }

  @keyframes rotate {
    0% {
      rotate: 0deg;
    }

    50% {
      rotate: 180deg;
    }

    100% {
      rotate: 360deg;
    }
  }

  header {
    font-size: 20px;
    padding: 20px 0;

    > div {
      @include flex-20;

      justify-content: space-between;

      nav {
        @include flex-20;

        a {
          color: $secondary-color;
          transition: color 0.3s ease;

          &.current, &.router-link-active {
            color: $light-nuxt-green;

            &:hover {
              color: $dark-nuxt-green;
            }
          }

          &:hover {
            color: $main-color;
          }
        }
      }

      .logo {
        display: flex;

        > div {
          animation: rotate 20s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 33px;
          width: 33px;
          background-image: linear-gradient(135deg, $light-nuxt-green, mediumpurple);
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

          &:last-child {
            margin-left: -10px;
            z-index: -10;
          }

          div {
            height: 28px;
            width: 28px;
            background-color: $main-background;
            border-radius: 50%;
            z-index: 10;
          }
        }
      }

      @media screen and (min-width: 570px) {
        justify-content: flex-start;
      }
    }
  }
</style>
