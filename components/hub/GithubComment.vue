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

        <a class="read-more" :href="issue.html_url" target="_blank">Read more</a>

        <div class="comment">
          <div class="item-infos">
            <GithubUser :size="40" :user="item.author" />

            <div class="description">
              <div>
                <a :href="repository.html_url" target="_blank">{{ item.author.login }}</a>
                <span>{{ ` / ${item.author.name}` }}</span>
              </div>

              <span>{{ dayjs(item.released_at).fromNow() }}</span>
            </div>
          </div>

          <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="github-content" v-html="item.body" />

          <GithubReactions :reactable="issue" />
        </div>
      </template>

      <template #footer>
        <div class="repository">
          <a :href="repository.html_url" targe="_blank">{{ repository.full_name }}</a>
          <GithubUser :size="25" :user="repository.owner" />
        </div>
      </template>
    </GithubFeedItem>
  </div>
</template>

<script setup lang="ts">
  import type { GhComment } from "~/types"

  import dayjs from "dayjs"
  import relativeTime from "dayjs/plugin/relativeTime"

  const props = defineProps<{
    item: GhComment
  }>()

  dayjs.extend(relativeTime)

  const issue = computed(() => props.item.issue)
  const repository = computed(() => issue.value.repository)
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
