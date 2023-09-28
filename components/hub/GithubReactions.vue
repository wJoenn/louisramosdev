<template>
  <div class="github-reactions">
    <ul>
      <li ref="popUp" class="pop-up" @mouseover="showPopUp = true" @mouseleave="showPopUp = false">
        <fai icon="fa-regular fa-face-smile" />

        <Transition name="pop-up">
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
  import type { GhReaction, GhRelease } from "../../types/api.ts"

  type GhReactionObject = {
    [key in GhReaction["content"]]?: {
      amount: number
      reacted: boolean
    }
  }

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

  const props = defineProps<{
    release: GhRelease
  }>()

  const { release } = toRefs(props)
  const repository = release.value.repository
  const reactions = computed(() => release.value.reactions)

  const config = useRuntimeConfig()
  const API_URL = `${config.public.apiUrl}/github_repositories/${repository.id}/github_releases/${release.value.id}`

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

  const popUp = ref<HTMLLIElement>()
  const showPopUp = ref(false)

  const createReaction = async (name: keyof GhReactionObject) => {
    try {
      const { data } = await useFetch<GhReaction>(`${API_URL}/github_reactions`, {
        method: "POST",
        body: { content: name },
      })

      reactions.value.push(data.value!)

      showPopUp.value = false
    } catch (error) {
      // console.log(error)
    }
  }

  const destroyReaction = async (reactionIndex: number) => {
    try {
      await useFetch(`${API_URL}/github_reactions/${reactions.value[reactionIndex].id}`, {
        method: "DELETE"
      })

      reactions.value.splice(reactionIndex, 1)

      showPopUp.value = false
    } catch (error) {
      // console.log(error)
    }
  }

  const toggleReaction = (name: keyof GhReactionObject) => {
    const reactionIndex = reactions.value.findIndex(r => r.content === name && r.user_id === 75_388_869)
    reactionIndex > -1 ? destroyReaction(reactionIndex) : createReaction(name)
  }
</script>

<style scoped lang="scss">
  .pop-up-enter-active,
  .pop-up-leave-active {
    transition: all 0.3s ease;
  }

  .pop-up-enter-from,
  .pop-up-leave-to {
    opacity: 0;
    translate: 0 5px;
  }

  .github-reactions {
    ul {
      align-items: center;
      display: flex;
      gap: 15px;

      li {
        align-items: center;
        border: 1px solid $secondary-color;
        border-radius: 1000px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        cursor: pointer;
        display: flex;
        justify-content: center;
        padding: 0.25rem 0.5rem;

        &.pop-up {
          position: relative;

          ul {
            align-items: center;
            background-color: $secondary-background;
            border: 1px solid $ternary-background;
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
                background-color: $dark-nuxt-green;

                &:hover {
                  background-color: $light-nuxt-green;
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