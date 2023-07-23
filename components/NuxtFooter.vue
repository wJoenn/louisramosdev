<template>
  <footer>
    <nav class="container">
      <a v-for="link in links" :key="link.name" :href="link.href" :aria-label="link.label" target="_blank">
        <fai :icon="link.icon" />
      </a>
    </nav>
  </footer>
</template>

<script setup lang="ts">
  const links = [
    { name: "github", icon: "fa-brands fa-github", href: "https://github.com/wJoenn", label: "Contact me on Github" },
    {
      name: "linkedin",
      icon: "fa-brands fa-linkedin",
      href: "https://www.linkedin.com/in/louisramosdev/",
      label: "Contact me on Linkedin"
    },
    { name: "mail", icon: "fa-solid fa-at", href: "mailto:contact@louisramos.dev", label: "Contact me by mail" }
  ]
</script>

<style scoped lang="scss">
  footer {
    font-size: 20px;
    margin: 0 50px;
    padding: 20px 0;

    nav {
      align-items: center;
      display: flex;
      gap: 20px;
      justify-content: flex-end;

      a {
        color: $secondary-color;

        &:hover {
          color: $main-color;
          transition: color 0.3s ease;
        }
      }

      svg {
        width: 20px;
      }
    }
  }
</style>
