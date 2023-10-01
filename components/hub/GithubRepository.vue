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
    .github-repository__description {
      font-size: $size-md;
    }

    .github-repository__details {
      > div {
        @include flex-centered(20);

        margin: 0 0 5px 20px;
      }

      span {
        @include flex-icon-small;
      }
    }

    .github-repository__title {
      @include flex-icon;
    }
  }
</style>
