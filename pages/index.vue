<template>
  <div id="home">
    <section id="header">
      <h1>Hello, I'm <span ref="title" data-text="Louis Ramos">Louis Ramos</span></h1>
      <p ref="subtitle" data-text="RoR Fullstack Developer">RoR Fullstack Developer</p>
    </section>

    <section id="about">
      <div>
        <h2>About me</h2>
        <p>I am a french native speaker currently living in Belgium with a strong passion for computer technologies. I started self-teaching frontend web development a couple years ago to transition from the restaurant industry to a role that'd be more inline with my centers of interest. My journey began learning from the basics with HTML and CSS up to JavaScript and eventually Vue.js</p>
        <p>In 2022 I decided to attend Full-Stack web development bootcamp at Le Wagon in hope of obtaining much desired backend skill too, there I gained expertise with tools like Ruby and Rails which really grew on me, Stimulus.js, PostgreSQL, Heroku, and more.</p>
        <p>When I'm not coding, I enjoy playing video games, reading mangas, and pursuing other geeky interests.</p>
      </div>

      <NuxtImg src="/images/pp.jpeg" alt="me" height="400" width="300" />
    </section>

    <section id="blogs">
      <h2>Latest blogs</h2>

      <ul class="blog-list">
        <li v-for="blog in blogs" :key="blog._id">
          <BlogCard :blog="blog" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
  import type Blog from "../types/Blog.ts"

  useHead({
    meta: [{
      name: "description",
      // eslint-disable-next-line vue/max-len
      content: "Passionate Belgium developer with a strong interest in computer technologies. Proficient in Vue.js, Ruby on Rails and Video Games. I've written a couple blogs, check them out"
    }],
    title: "Louis Ramos | RoR Fullstack Developer"
  })

  const blogs = await queryContent("/blogs")
    .sort({ date: -1 })
    .only(["title", "description", "cover_url", "date", "_path", "_id"])
    .limit(3)
    .find() as Blog[]

  let repeat: NodeJS.Timer
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const title = ref<HTMLSpanElement | null>(null)
  const subtitle = ref<HTMLHeadingElement | null>(null)

  const shuffleText = (...elements: HTMLElement[]) => {
    elements.forEach(element => {
      const initialText = element.dataset.text as string

      // This interval progress ensure that all elements begin and end their animation at the same time.
      const intervalProgress = 1 / (4 + (initialText.length - 10) / 10 * -2)

      let i = 0
      const interval = setInterval(() => {
        element.innerText = element.innerText.split("").map((_letter, index) => {
          if (index < i) { return initialText[index] }

          return LETTERS[Math.floor(Math.random() * 26)]
        }).join("")

        if (i >= initialText.length) { clearInterval(interval) }

        i += intervalProgress
      }, 30)
    })
  }

  onMounted(() => {
    shuffleText(title.value!, subtitle.value!)

    repeat = setInterval(() => {
      shuffleText(title.value!, subtitle.value!)
    }, 10000)
  })

  onUnmounted(() => {
    clearInterval(repeat)
  })
</script>

<style scoped lang="scss">
  #home {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;

    #about {
      @include flex-centered(50);

      flex-direction: column;
      flex-grow: 1;

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

    #header {
      h1 {
        font-family: 'Azeret Mono', monospace;

        span {
          color: inherit;
          font-size: inherit;
          max-width: 60%;
          word-break: break-word;
        }
      }

      p {
        font-family: 'Azeret Mono', monospace;
        font-size: 15px;
        font-style: italic;
        font-weight: 300;
      }
    }

    @media screen and (min-width: 990px) {
      padding-top: 50px;
    }
  }
</style>
