<template>
  <div id="blogs" class="t-shadow">
    <h1>Blogs</h1>

    <p>I've always enjoyed transmitting whatever knowledge I have to other people. I try to answer to as many questions as I can on forums and such and there are some topics that I tend to repeat on regularly so I figured I could just create a collection of blog posts where I would go over those and share them to whoever is interested instead of rewritting the whole thing everytime.</p>
    <p>I was also looking for an occasion to create a website with Nuxt that would benefit from it's server side rendering and, in my opinion, a blog posts is the perfect occasion for that.</p>
    <p>Two birds with one stone.</p>

    <ul class="blog-list">
      <li v-for="blog in blogs" :key="blog._id">
        <Blog :blog="blog" />
      </li>
    </ul>
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
      .only(["title", "description", "cover_url", "_path", "_id"])
      .find() as Promise<Blog[]>
  ))
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
