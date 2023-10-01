<template>
  <GithubTooltip :show="showRepository">
    <div class="github-repository">
      <p class="github-repository__title">
        <fai icon="fa-solid fa-book" />
        <a :href="repository.html_url" target="_blank">{{ repository.full_name }}</a>
      </p>

      <span class="github-repository__description">{{ repository.description }}</span>

      <div class="github-repository__details">
        <div>
          <span :class="`language-${repository.language}`">{{ repository.language }}</span>
          <span><fai icon="fa-regular fa-star" />{{ repository.stargazers_count }}</span>
          <span><fai icon="fa-solid fa-code-fork" />{{ repository.forks_count }}</span>
        </div>

        <span>Updated {{ dayjs(repository.pushed_at).fromNow() }}</span>
      </div>
    </div>
  </GithubTooltip>
</template>

<script setup lang="ts">
  import dayjs from "dayjs"
  import type { GhRepository } from "../../types/api.ts"

  defineProps<{
    repository: GhRepository
    showRepository: boolean
  }>()
</script>

<style scoped lang="scss">
  .github-repository {
    background-color: $secondary-background;
    border: 1px solid $ternary-background;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    width: 300px;

    &__description {
      font-size: 0.9rem;
    }

    &__details > div {
      align-items: center;
      display: flex;
      gap: 20px;
      margin-left: 20px;

      span {
        align-items: center;
        display: flex;
        gap: 5px;
      }
    }

    &__title {
      align-items: center;
      display: flex;
      gap: 10px;
    }

    * {
      text-align: left;
    }

    svg {
      height: 15px;
    }
  }
</style>
