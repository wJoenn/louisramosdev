<template>
  <Transition name="user">
    <div v-if="showUser" ref="githubUserComponent" class="github-user">
      <div class="github-user__content">
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

      <div class="github-user__arrow" :style="arrowCssStyle" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
  import { GhUser } from "../../types/api.ts"

  const props = defineProps<{
    user: GhUser
    showUser: boolean
  }>()

  const { user, showUser } = toRefs(props)
  const isUser = computed(() => user.value.type === "User")
  const mouseCoords = inject<Ref<[number, number]>>("mouseCoords")!

  const githubUserComponent = ref<HTMLDivElement>()
  const arrowCssStyle = ref({})

  watch(githubUserComponent, () => {
    if (githubUserComponent.value) {
      const componentRight = githubUserComponent.value.getBoundingClientRect().right
      let right = componentRight - mouseCoords.value[0] - 10
      if (right < 15) { right = 15 }
      if (right > 45) { right = 45 }

      arrowCssStyle.value = { right: `${right}px` }
    }
  })
</script>

<style scoped lang="scss">
  .user-enter-active,
  .user-leave-active {
    transition: all 0.3s ease;
  }

  .user-enter-from,
  .user-leave-to {
    opacity: 0;
    translate: 0 10px;
  }

  .github-user {
    align-items: flex-end;
    bottom: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    position: absolute;
    right: -15px;
    transition: all 0.3s ease;

    &__arrow {
      border-left: 10px solid transparent;
      border-radius: 0 0 10px rgba(0, 0, 0, 0.5);
      border-right: 10px solid transparent;
      border-top: 10px solid $ternary-background;
      height: 0;
      position: absolute;
      top: calc(100% - 15px);
      width: 0;
    }

    &__content {
      background-color: $secondary-background;
      border: 1px solid $ternary-background;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 10px;
      width: 300px;

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
        text-align: left;

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
        text-align: left;
      }

      svg {
        width: 10px;
      }
    }
  }
</style>
