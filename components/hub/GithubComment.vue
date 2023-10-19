<template>
  <div class="github-comment">
    <GithubFeedItem :feed-item="issue" :title="issue.title" :user="issue.author">
      <template #description>
        <div>
          <span>{{ `${issue.author.name} / ` }}</span>
          <a :href="issue.author.html_url" target="_blank">{{ issue.author.login }}</a>
        </div>
      </template>

      <template #default>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="github-content issue" v-html="issue.body" />

        <a :href="issue.html_url" target="_blank" class="read-more">Read more</a>

        <div class="comment">
          <div class="item-infos">
            <GithubUser :user="comment.author" :size="40" />

            <div class="description">
              <div>
                <a :href="repository.html_url" target="_blank">{{ comment.author.login }}</a>
                <span>{{ ` / ${comment.author.name}` }}</span>
              </div>

              <span>{{ dayjs(comment.released_at).fromNow() }}</span>
            </div>
          </div>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="github-content" v-html="comment.body" />

          <GithubReactions :reactable="comment" />
        </div>
      </template>

      <template #footer>
        <div class="repository">
          <a :href="repository.html_url" targe="_blank">{{ repository.full_name }}</a>
          <GithubUser :user="repository.owner" :size="25" />
        </div>
      </template>
    </GithubFeedItem>
  </div>
</template>

<script setup lang="ts">
  import dayjs from "dayjs"
  import relativeTime from "dayjs/plugin/relativeTime"

  import type { GhComment } from "../../types/api/Github.ts"

  dayjs.extend(relativeTime)

  const props = defineProps<{
    item: GhComment
  }>()

  const { item: comment } = toRefs(props)
  const { issue } = comment.value
  const { repository } = issue
</script>

<style scoped lang=scss>
  .github-comment {
    .comment {
      border: $border-dark;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;

      .description {
        text-align: left !important;
      }
    }

    .github-content.issue {
      -webkit-line-clamp: 3;
    }

    .read-more {
      @include btn
    }

    .repository {
      @include flex-centered(5);

      p {
        position: relative;
      }
    }
  }
</style>
