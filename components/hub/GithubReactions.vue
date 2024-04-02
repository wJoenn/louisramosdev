<template>
  <div class="github-reactions">
    <ul>
      <li ref="popUp" class="pop-up" @mouseleave="showPopUp = false" @mouseover="showPopUp = true">
        <ClientOnly>
          <Icon icon="fa-regular fa-face-smile" />
        </ClientOnly>

        <Transition name="slide-up">
          <ul v-if="showPopUp">
            <li
              v-for="(reaction, name) in sanitizedReactions"
              :key="name"
              :class="{ reacted: reaction!.reacted }"
              @click.stop="toggleReaction(name)"
            >
              {{ reactionIcons[name] }}
            </li>
          </ul>
        </Transition>
      </li>

      <li
        v-for="(reaction, name) in filteredReactions"
        :key="name"
        :class="{ reacted: reaction!.reacted }"
        @click.stop="toggleReaction(name)"
      >
        {{ reactionIcons[name] }} {{ reaction!.amount }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import type { GhComment, GhIssue, GhReaction, GhRelease } from "~/types"

  type GhReactionObject = {
    [key in GhReaction["content"]]?: {
      amount: number
      reacted: boolean
    }
  }

  const props = defineProps<{
    reactable: GhComment | GhIssue | GhRelease
  }>()

  const reactionIcons = {
    "+1": "👍",
    "-1": "👎",
    "confused": "😕",
    "eyes": "👀",
    "heart": "❤️",
    "hooray": "🎉",
    "laugh": "😄",
    "rocket": "🚀"
  }

  const config = useRuntimeConfig()

  const reactions = computed(() => props.reactable.reactions)
  const repository = computed(() => (
    "repository" in props.reactable ? props.reactable.repository : props.reactable.issue.repository
  ))

  const reactablePath = computed(() => {
    switch (props.reactable.feed_type) {
    case "GithubComment": return "comments"
    case "GithubIssue": return "issues"
    case "GithubRelease": return "releases"
    default: return props.reactable
    }
  })

  const apiUrl = computed(() => (
    `${config.public.apiUrl}/github/repositories/${repository.value.id}/${reactablePath.value}/${props.reactable.id}`
  ))

  const popUp = ref<HTMLLIElement>()
  const showPopUp = ref(false)

  const sanitizedReactions = computed<GhReactionObject>(() => {
    const reactionObject: GhReactionObject = {
      "+1": { amount: 0, reacted: false },
      "-1": { amount: 0, reacted: false },
      "confused": { amount: 0, reacted: false },
      "eyes": { amount: 0, reacted: false },
      "heart": { amount: 0, reacted: false },
      "hooray": { amount: 0, reacted: false },
      "laugh": { amount: 0, reacted: false },
      "rocket": { amount: 0, reacted: false }
    }

    reactions.value.forEach(reaction => {
      reactionObject[reaction.content]!.amount += 1
      if (reaction.user_id === 75_388_869) { reactionObject[reaction.content]!.reacted = true }
    })

    return reactionObject
  })

  const filteredReactions = computed(() => {
    const reactionsObject: GhReactionObject = {}

    Object.entries(sanitizedReactions.value).forEach(([name, reaction]) => {
      if (reaction.amount > 0) { reactionsObject[name as keyof GhReactionObject] = reaction }
    })

    return reactionsObject
  })

  const createReaction = async (name: keyof GhReactionObject) => {
    try {
      const { data } = await useFetch<GhReaction>(`${apiUrl.value}/reactions`, {
        body: { content: name },
        method: "POST"
      })

      reactions.value.push(data.value!)

      showPopUp.value = false
    } catch (error) {
      // console.log(error)
    }
  }

  const destroyReaction = async (reactionIndex: number) => {
    try {
      await useFetch(`${apiUrl.value}/reactions/${reactions.value[reactionIndex].id}`, {
        method: "DELETE"
      })

      reactions.value.splice(reactionIndex, 1)

      showPopUp.value = false
    } catch (error) {
      // console.log(error)
    }
  }

  const toggleReaction = async (name: keyof GhReactionObject) => {
    const reactionIndex = reactions.value.findIndex(r => r.content === name && r.user_id === 75_388_869)
    await (reactionIndex > -1 ? destroyReaction(reactionIndex) : createReaction(name))
  }
</script>

<style scoped lang="scss">
  .github-reactions {
    ul {
      @include flex-centered(20);

      color: white;
      font-size: $size;

      li {
        align-items: center;
        border: $border;
        border-radius: 1000px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        cursor: pointer;
        display: flex;
        justify-content: center;
        padding: $padding-sm;

        &:hover {
          background-color: $secondary-background;
        }

        &.pop-up {
          position: relative;

          ul {
            background-color: $secondary-background;
            border: $border-dark;
            border-radius: 10px;
            bottom: -15px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 5px;
            left: -15px;
            padding: 5px;
            position: absolute;

            li {
              border: none;
              border-radius: 5px;
              box-shadow: none;

              &.reacted {
                background-color: $light-nuxt-green;

                &:hover {
                  background-color: $dark-nuxt-green;
                }
              }

              &:hover {
                background-color: $ternary-background;
              }
            }
          }
        }

        &.reacted {
          border-color: $light-nuxt-green;
        }

        &:has(svg) {
          border-color: transparent;
          padding: 0.3rem;

          svg {
            color: $secondary-color;
          }
        }
      }
    }
  }
</style>
