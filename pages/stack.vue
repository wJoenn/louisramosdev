<template>
  <div id="stack" class="t-shadow">
    <h1>Stack</h1>

    <p>I like to talk about my tech stack. I'm a bit of a collector, the kind of guys that aims to get every single achievements in a video game before considering it done, so naturally I became very interested in what are the tools that exists in Web Development and which ones I "collect" to grow my Stack with as many little icons as I can.</p>
    <p>I figured it might interest some people to learn about what I decided to use. There's nothing too extravagent yet, so far it's mostly just Vue and Ruby, but who knows what I might end up with later.</p>

    <ClientOnly>
      <Transition appear @before-enter="beforeEnter" @enter="enter">
        <section v-if="frontendTools" id="frontend" data-delay="0">
          <div class="title">
            <h2>Frontend</h2>
            <span>This is the Stack that's being used for this website</span>
          </div>

          <TransitionGroup appear tag="ul" @before-enter="beforeEnter" @enter="enter">
            <li v-for="(tool, index) in frontendTools" :key="tool.name" :data-delay="index">
              <ToolCard :tool="tool" />
            </li>
          </TransitionGroup>
        </section>
      </Transition>

      <Transition appear @before-enter="beforeEnter" @enter="enter">
        <section v-if="backendTools" id="backend" :data-delay="frontendTools?.length">
          <h2>Backend</h2>

          <TransitionGroup appear tag="ul" @before-enter="beforeEnter" @enter="enter">
            <li v-for="(tool, index) in backendTools" :key="tool.name" :data-delay="index + (frontendTools?.length || 0)">
              <ToolCard :tool="tool" />
            </li>
          </TransitionGroup>
        </section>
      </Transition>

      <Transition appear @before-enter="beforeEnter" @enter="enter">
        <section v-if="otherTools" id="other" :data-delay="(frontendTools?.length || 0) + (backendTools?.length || 0)">
          <h2>Other Tools</h2>
          <TransitionGroup appear tag="ul" @before-enter="beforeEnter" @enter="enter">
            <li v-for="(tool, index) in otherTools" :key="tool.name" :data-delay="index + (frontendTools?.length || 0) + (backendTools?.length || 0)">
              <ToolCard :tool="tool" />
            </li>
          </TransitionGroup>
        </section>
      </Transition>

      <Transition appear name="foot" @before-enter="beforeEnter" @enter="enter">
        <p v-if="data" :data-delay="(frontendTools?.length || 0) + (backendTools?.length || 0) + (otherTools?.length || 0)">There are more tools that I'd like to get into in the near future like <a href="https://vitest.dev/" target="_blank">Vitest</a>, <a href="https://nodejs.org/en" target="_blank">Node.js</a>, <a href="https://www.docker.com/" target="_blank">Docker</a> and <a href="https://go.dev/" target="_blank">Golang</a> but that's it for now.</p>
      </Transition>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  useHead({
    meta: [{
      name: "description",
      // eslint-disable-next-line vue/max-len
      content: "Passionate Belgium developer with a strong interest in computer technologies. Proficient in Vue.js, Ruby on Rails and Video Games. I've written a couple blogs, check them out"
    }],
    title: "Louis Ramos | RoR Fullstack Developer"
  })

  const { data } = await useFetch("/api/tools")
  const frontendTools = computed(() => data.value?.frontendTools)
  const backendTools = computed(() => data.value?.backendTools)
  const otherTools = computed(() => data.value?.otherTools)

  const beforeEnter = (element: Element) => {
    const htmlElement = element as HTMLElement
    htmlElement.classList.add("before-enter")
    htmlElement.style.transition = `all 0.8s ease ${0.1 * +htmlElement.dataset.delay!}s`
  }

  const enter = (element: Element) => {
    const htmlElement = element as HTMLElement

    setTimeout(() => {
      htmlElement.classList.remove("before-enter")
    }, 500)
  }
</script>

<style scoped lang="scss">
  #stack {
    p {
      margin: 20px 0;

      a {
        color: $light-nuxt-green;
      }
    }

    section {
      margin: 50px 0;

      .title {
        align-items: baseline;
        display: flex;
        flex-direction: column;
        gap: 20px;

        span {
          color: $secondary-color;
        }

        @media screen and (min-width: 570px) {
          flex-direction: row;
        }
      }

      ul {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        margin: 20px 0;
        transition: all 0.3s ease;

        @media screen and (min-width: 560px) {
          grid-template-columns: 1fr 1fr;
        }

        @media screen and (min-width: 990px) {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
      }
    }

    .before-enter {
      opacity: 0;
      translate: 0 100px;
    }
  }
</style>
