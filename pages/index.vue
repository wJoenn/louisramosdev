<template>
  <div id="home">
    <section id="header">
      <h1>Hello, I'm <span ref="title" data-text="Louis Ramos">Louis Ramos</span></h1>
      <h3 ref="subtitle" data-text="RoR Fullstack Developer">RoR Fullstack Developer</h3>
    </section>

    <section id="about">
      <div>
        <h2>About me</h2>
        <p>I am a french native speaker currently living in Belgium with a strong passion for computer technologies. I started self-teaching frontend web development a couple years ago to transition from the restaurant industry to a role that'd be more inline with my centers of interest. My journey began learning from the basics with HTML and CSS up to JavaScript and eventually Vue.js</p>
        <p>In 2022 I decided to attend Full-Stack web development bootcamp at Le Wagon in hope of obtaining much desired backend skill too, there I gained expertise with tools like Ruby and Rails which really grew on me, Stimulus.js, PostgreSQL, Heroku, and more.</p>
        <p>When I'm not coding, I enjoy playing video games, reading mangas, and pursuing other geeky interests.</p>
      </div>

      <img src="assets/images/pp.jpeg" alt="me">
    </section>

    <section id="blogs">
      <h2>Latest blogs</h2>

      <ul class="blog-list">
        <li v-for="blog in blogs" :key="blog._id">
          <Blog :blog="blog" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
  import type Blog from "@/types/Blog"

  useHead({
    meta: [{
      name: "description",
      // eslint-disable-next-line vue/max-len
      content: "Passionate Belgium developer with a strong interest in computer technologies. Proficient in Vue.js, Ruby on Rails and Video Games. I've written a couple blogs, check them out"
    }],
    title: "Louis Ramos | RoR Fullstack Developer"
  })

  const { data: blogs } = await useAsyncData("blogs", () => (
    queryContent("/blogs")
      .sort({ date: 1 })
      .only(["title", "description", "cover_url", "_path", "_id"])
      .limit(3)
      .find() as Promise<Blog[]>
  ))

  const title = ref<HTMLSpanElement>()
  const subtitle = ref<HTMLHeadingElement>()
  const repeat = ref<NodeJS.Timer>()

  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const shuffleText = (...elements: HTMLElement[]) => {
    elements.forEach(element => {
      const initialText = element.dataset.text as string
      const intervalRepeat = 1 / (4 + ((Math.round(initialText.length - 10) / 10) * -2))

      let i = 0
      const interval = setInterval(() => {
        element.innerText = element.innerText.split("").map((_letter, index) => {
          if (index < i) { return initialText[index] }

          return LETTERS[Math.floor(Math.random() * 26)]
        }).join("")

        if (i >= initialText.length) { clearInterval(interval) }

        i += intervalRepeat
      }, 30)
    })
  }

  onMounted(() => {
    shuffleText(title.value!, subtitle.value!)

    repeat.value = setInterval(() => {
      shuffleText(title.value!, subtitle.value!)
    }, 10000)
  })

  onUnmounted(() => {
    clearInterval(repeat.value)
  })
</script>

<style scoped lang="scss">
  #home {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;

    h1 {
      font-family: 'Azeret Mono', monospace;
    }

    h3 {
      font-family: 'Azeret Mono', monospace;
      font-size: 15px;
      font-style: italic;
      font-weight: 300;
    }

    #about {
      align-items: center;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 50px;

      p {
        line-height: 25px;
        margin: 20px 0;
      }

      img {
        border: 2px solid $main-color;
        border-radius: 50px;
        width: 300px;
      }

      @media screen and (min-width: 990px) {
        flex-direction: row;
      }
    }

    #blogs {
      margin-top: 40px;
    }

    @media screen and (min-width: 990px) {
      padding-top: 50px;
    }
  }
</style>
