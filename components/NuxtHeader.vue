<template>
  <header>
    <div class="container">
      <img src="assets/images/Nuxt.png" alt="">

      <nav>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/blogs">Blogs</NuxtLink>
        <NuxtLink to="/stack">Stack</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
  @mixin flex-20 {
    align-items: center;
    display: flex;
    gap: 20px;
  }

  header {
    box-shadow: 0 0 10px black;
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

          &.router-link-exact-active {
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
