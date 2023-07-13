<template>
  <div id="stack">
    <h1>Stack</h1>

    <p>I like to talk about my tech stack. I'm a bit of a collector, the kind of guys that aims to get every single achievements in a video game before considering it done, so naturally I became very interested in what are the tools that exists in Web Development and which ones I "collect" to grow my Stack with as many little icons as I can.</p>
    <p>I figured it might interest some people to learn about what I decided to use. There's nothing too extravagent yet, so far it's mostly just Vue and Ruby, but who knows what I might end up with later.</p>

    <ClientOnly>
      <Transition appear name="frontend" @before-enter="beforeEnter" @enter="enter">
        <section id="frontend" data-delay="0">
          <div class="title">
            <h2>Frontend</h2>
            <h4>This is the Stack that's being used for this website</h4>
          </div>

          <TransitionGroup appear tag="ul" @before-enter="beforeEnter" @enter="enter">
            <li v-for="(tool, index) in frontendTools" :key="tool.name" :data-delay="index">
              <Tool :tool="tool" />
            </li>
          </TransitionGroup>
        </section>
      </Transition>

      <Transition appear name="backend" @before-enter="beforeEnter" @enter="enter">
        <section id="backend" :data-delay="frontendTools.length">
          <h2>Backend</h2>

          <TransitionGroup appear tag="ul" @before-enter="beforeEnter" @enter="enter">
            <li v-for="(tool, index) in backendTools" :key="tool.name" :data-delay="index + frontendTools.length">
              <Tool :tool="tool" />
            </li>
          </TransitionGroup>
        </section>
      </Transition>

      <Transition appear name="other" @before-enter="beforeEnter" @enter="enter">
        <section id="other" :data-delay="frontendTools.length + backendTools.length">
          <h2>Other Tools</h2>
          <TransitionGroup appear tag="ul" @before-enter="beforeEnter" @enter="enter">
            <li v-for="(tool, index) in otherTools" :key="tool.name" :data-delay="index + frontendTools.length + backendTools.length">
              <Tool :tool="tool" />
            </li>
          </TransitionGroup>
        </section>
      </Transition>

      <Transition appear name="foot" @before-enter="beforeEnter" @enter="enter">
        <p :data-delay="frontendTools.length + backendTools.length + otherTools.length">There are more tools that I'd like to get into in the near future like <a href="https://vitest.dev/" target="_blank">Vitest</a>, <a href="https://nodejs.org/en" target="_blank">Node.js</a>, <a href="https://www.docker.com/" target="_blank">Docker</a> and <a href="https://go.dev/" target="_blank">Go</a> but that's it for now.</p>
      </Transition>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  const { data } = await useFetch("/api/tools")
  const frontendTools = ref(data.value!.frontendTools)
  const backendTools = ref(data.value!.backendTools)
  const otherTools = ref(data.value!.otherTools)

  const beforeEnter = (element: Element) => {
    const htmlElement = element as HTMLElement
    htmlElement.style.opacity = "0"
    htmlElement.style.translate = "0 100px"
    htmlElement.style.transition = `all 0.8s ease ${0.1 * +htmlElement.dataset.delay!}s`
  }

  const enter = (element: Element) => {
    const htmlElement = element as HTMLElement

    setTimeout(() => {
      htmlElement.style.opacity = "1"
      htmlElement.style.translate = "0 0"
    }, 500)
  }
</script>

<style lang="scss">
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
        gap: 20px;

        h4 {
          color: $secondary-color;
          font-weight: 400;
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
  }
</style>
