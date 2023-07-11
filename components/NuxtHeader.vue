<template>
  <header>
    <div class="container">
      <img src="@/assets/images/nuxt.png" alt="">

      <nav>
        <NuxtLink to="/" :class="{ current: route.name === 'index' }">Home</NuxtLink>
        <NuxtLink to="/blogs" :class="{ current: (route.name as string).includes('blogs') }">Blogs</NuxtLink>
        <NuxtLink to="/stack" :class="{ current: route.name === 'stack' }">Stack</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  const route = useRoute()
</script>

<style scoped lang="scss">
  @mixin flex-20 {
    align-items: center;
    display: flex;
    gap: 20px;
  }

  header {
    font-size: 20px;
    padding: 20px;

    div {
      @include flex-20;

      img {
        width: 40px;
      }

      nav {
        @include flex-20;

        a {
          color: $secondary-color;
          transition: color 0.3s ease;

          &.current {
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
    }
  }
</style>
