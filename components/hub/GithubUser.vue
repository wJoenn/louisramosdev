<template>
  <div class="github-user" @mouseenter="showUser = true" @mouseleave="showUser = false">
    <a :href="user.html_url" target="_blank">
      <img
        class="avatar"
        :class="{ 'avatar-rounded': isUser }"
        :style="{ height: `${size}px`}"
        :src="user.avatar_url"
        :alt="`${user.login} avatar`">
    </a>

    <GithubTooltip :show="showUser">
      <div class="tooltip">
        <div>
          <img class="avatar" :class="{ 'avatar-rounded': isUser }" :src="user.avatar_url" :alt="`${user.login} avatar`">

          <div>
            <p>
              <a :href="user.html_url" target="_blank">{{ isUser ? user.login : user.name }}</a>
              <span>{{ isUser ? user.name : user.login }}</span>
            </p>

            <span>{{ user.bio }}</span>
          </div>
        </div>

        <p v-if="user.location" class="location"><fai icon="fa-solid fa-location-dot" />{{ user.location }}</p>
      </div>
    </GithubTooltip>
  </div>
</template>

<script setup lang="ts">
  import type { GhUser } from "~/types"

  const props = withDefaults(defineProps<{
    size?: number
    user: GhUser
  }>(), {
    size: 50
  })

  const { size, user } = toRefs(props)
  const isUser = computed(() => user.value.type === "User")
  const showUser = ref(false)
</script>

<style scoped lang="scss">
  .github-user {
    position: relative;

    .tooltip {
      > div {
        display: flex;
        gap: 10px;

        div {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 5px;

          > span {
            font-size: $size-md;
          }
        }
      }

      p {
        color: $main-color;
        display: block;
        font-size: $size;

        &.location {
          @include flex-icon-small;

          margin-left: 5px;

          svg {
            color: $secondary-color;
          }
        }
      }

      span {
        display: block;
      }
    }
  }
</style>
