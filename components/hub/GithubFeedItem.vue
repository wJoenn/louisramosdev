<template>
  <div class="github-feed-item">
    <div class="header">
      <a :href="feedItem.html_url" target="_blank">
        <h2>{{ title }}</h2>
      </a>

      <div class="item-infos">
        <div class="description">
          <slot name="description" />
          <span>{{ dayjs(feedItem.released_at).fromNow() }}</span>
        </div>

        <GithubUser :user="user" />
      </div>
    </div>

    <slot />

    <div class="footer">
      <div>
        <slot name="footer" />
        <p :class="`language-${feedItem.repository.language}`">{{ feedItem.repository.language }}</p>
      </div>

      <GithubReactions :reactable="feedItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { GhIssue, GhRelease, GhUser } from "~/types"

  import dayjs from "dayjs"
  import relativeTime from "dayjs/plugin/relativeTime"

  dayjs.extend(relativeTime)

  defineProps<{
    feedItem: GhIssue | GhRelease
    title: string
    user: GhUser
  }>()
</script>

<style lang=scss>
  .github-feed-item {
    background-color: $main-background;
    border: $border-dark;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 30px auto;
    max-width: 100%;
    padding: 20px;
    width: 900px;

    .footer > div {
      @include flex-centered(50);

      color: $secondary-color;
      font-size: 0.8rem;
      margin: 0 0 10px 5px;
    }

    .header {
      align-items: flex-start;
      display: flex;
      gap: 20px;
      justify-content: space-between;

      h2 {
        font-size: 30px;
      }
    }

    .item-infos {
      @include flex-centered(10);

      flex-shrink: 0;

      > div {
        position: relative;
      }

      .description {
        text-align: right;

        p {
          font-weight: 500;
        }
      }
    }
  }
</style>
