<template>
  <footer>
    <nav class="container">
      <a v-for="link in links" :key="link.name" :aria-label="link.label" :href="link.href" target="_blank">
        <Icon :name="link.icon" />
      </a>
    </nav>
  </footer>
</template>

<script setup lang="ts">
  const links = [
    { href: "https://github.com/wJoenn", icon: "fa6-brands:github", label: "Contact me on Github", name: "github" },
    {
      href: "https://www.linkedin.com/in/louisramosdev/",
      icon: "fa6-brands:linkedin",
      label: "Contact me on Linkedin",
      name: "linkedin"
    },
    { href: "mailto:contact@louisramos.dev", icon: "fa6-solid:at", label: "Contact me by mail", name: "mail" }
  ]
</script>

<style scoped lang="scss">
  footer {
    font-size: 20px;
    margin: 0 50px;
    padding: 20px 0;

    nav {
      @include flex-centered(20);

      justify-content: flex-end;

      a {
        color: $secondary-color;

        &:hover {
          color: $main-color;
        }
      }
    }
  }
</style>
