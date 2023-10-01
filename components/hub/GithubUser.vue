<template>
  <GithubTooltip :show="showUser">
    <div class="github-user">
      <div>
        <img :src="user.avatar_url" :alt="`${user.login} avatar`" :class="{ round: isUser }">

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
</template>

<script setup lang="ts">
  import type { GhUser } from "../../types/api.ts"

  const props = defineProps<{
    user: GhUser
    showUser: boolean
  }>()

  const { user } = toRefs(props)
  const isUser = computed(() => user.value.type === "User")
</script>

<style scoped lang="scss">
  .github-user {
    background-color: $secondary-background;
    border: 1px solid $ternary-background;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    width: 300px;

    * {
      text-align: left;
    }

    > div {
      display: flex;
      gap: 10px;

      div {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 5px;

        a {
          margin: 0;

          &:hover {
            color: $light-nuxt-green;
          }
        }
      }

      img {
        border-radius: 5px;
        height: 50px;
        width: 50px;

        &.round {
          border-radius: 50%;
        }
      }
    }

    p {
      color: $main-color;
      display: block;
      font-size: 16px;

      &.location {
        align-items: center;
        display: flex;
        font-size: 0.8rem;
        gap: 5px;
        margin-left: 5px;

        svg {
          color: $secondary-color;
        }
      }
    }

    span {
      color: $secondary-color;
      display: block;
      font-size: 0.8rem;
    }

    svg {
      height: 10px;
    }
  }
</style>
