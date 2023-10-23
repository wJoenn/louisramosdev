<template>
  <div id="blogs">
    <h1>Blogs</h1>

    <p>I've always enjoyed transmitting whatever knowledge I have to other people. I try to answer to as many questions as I can on forums and such and there are some topics that I tend to repeat on a regular basis so I figured I could just create a collection of blog posts where I would go over those topics and share them to whoever is interested instead of rewritting the whole thing everytime.</p>
    <p>I was also looking for an occasion to create a website with Nuxt that would benefit from it's server side rendering and, in my opinion, a blog posts is the perfect occasion for that.</p>
    <p>Two birds with one stone.</p>

    <ul class="blog-list">
      <li v-for="blog in blogs" :key="blog._id">
        <BlogCard :blog="blog" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import type { Blog } from "~/types"

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
    .find() as Blog[]
</script>

<style scoped lang="scss">
  #blogs {
    p {
      margin: 20px 0;
    }

    ul {
      margin-top: 50px;
    }
  }
</style>
