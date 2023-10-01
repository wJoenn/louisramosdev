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

        <ClientOnly>
          <nav v-if="isLoggedIn">
            <NuxtLink to="/hub" :class="{ current: isHub }">Hub</NuxtLink>
            <a href="https://the-hub.fly.dev/good_job/jobs" target="_blank">GoodJobs</a>
          </nav>
        </ClientOnly>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  const isBlog = inject<Ref<boolean>>("isBlog")
  const isHub = inject<Ref<boolean>>("isHub")
  const isLoggedIn = inject<Ref<boolean>>("isLoggedIn")
</script>

<style scoped lang="scss">
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
      @include flex-centered(20);

      justify-content: space-between;

      nav {
        @include flex-centered(20);

        a {
          color: $secondary-color;

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
