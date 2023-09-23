export default defineEventHandler(() => {
  const frontendTools = [
    {
      name: "Sass",
      description: "A CSS preprocessor with features like variables, nesting, mixins, and more",
      image_url: "sass.png",
      url: "https://sass-lang.com/"
    },
    {
      name: "TailwindCSS",
      description: "A highly customizable, utility-first CSS framework that provides a set of pre-built CSS classes.",
      image_url: "tailwindcss.png",
      url: "https://tailwindcss.com/"
    },
    {
      name: "PostCSS",
      description: "A tool for transforming CSS with JavaScript",
      image_url: "postcss.png",
      url: "https://postcss.org/"
    },
    {
      name: "TypeScript",
      description: "A superset of JavaScript that adds static type checking",
      image_url: "typescript.png",
      url: "https://www.typescriptlang.org/"
    },
    {
      name: "Vue.js",
      description: "A progressive JavaScript framework for building user interfaces",
      image_url: "vue.png",
      url: "https://vuejs.org/"
    },
    {
      name: "Nuxt",
      description: "A meta-framework for Vue.js that provides SSR, routing, and other powerful features",
      image_url: "nuxt.png",
      url: "https://nuxt.com/"
    },
    {
      name: "Pinia",
      description: "A state management solution for Vue.js applications",
      image_url: "pinia.png",
      url: "https://pinia.vuejs.org/"
    },
    // {
    //   name: "Vue Query",
    //   description: "A data-fetching and state management library for Vue.js applications",
    //   image_url: "vue_query.png",
    //   url: "https://vue-query.vercel.app/#/"
    // },
    {
      name: "Vite",
      description: "A lightning-fast JavaScript bundler and development server",
      image_url: "vite.png",
      url: "https://vitejs.dev/"
    },
    // {
    //   name: "Vitest",
    //   description: "A lightweight and intuitive testing library build on Vite",
    //   image_url: "vitest.png",
    //   url: "https://vitest.dev/"
    // },
    // {
    //   name: "Cypress",
    //   description: "An end-to-end testing framework for web applications",
    //   image_url: "cypress.png",
    //   url: "https://www.cypress.io/"
    // },
    {
      name: "esLint",
      description: "A configurable JavaScript linter to enforce code quality and best practices",
      image_url: "eslint.png",
      url: "https://eslint.org/"
    },
    // {
    //   name: "PNPM",
    //   description: "A package manager for JavaScript projects that emphasizes speed and disk space efficiency",
    //   image_url: "pnpm.png",
    //   url: "https://pnpm.io/"
    // },
    {
      name: "Bun",
      description: "A fast JavaScript runtime, package manager, bundler and test runner",
      image_url: "bun.png",
      url: "https://bun.sh/"
    },
    {
      name: "Vercel",
      description: "A platform that provides the tools, workflows, and infrastructure to build and deploy web apps",
      image_url: "vercel.png",
      url: "https://vercel.com/"
    }
  ]

  const backendTools = [
    {
      name: "Ruby",
      description: "An object-oriented language known for its simplicity and readability",
      image_url: "ruby.png",
      url: "https://www.ruby-lang.org/en/"
    },
    {
      name: "Sinatra",
      description: "A lightweight web application framework for Ruby",
      image_url: "sinatra.png",
      url: "https://sinatrarb.com/"
    },
    {
      name: "Ruby on Rails",
      description: "A batteries included full-stack web framework built on Ruby",
      image_url: "rails.png",
      url: "https://rubyonrails.org/"
    },
    {
      name: "RSpec",
      description: "A behavior-driven development framework for writing expressive and readable tests",
      image_url: "rspec.png",
      url: "https://rspec.info/"
    },
    {
      name: "Rubocop",
      description: "A code analyzer for Ruby that enforces consistent coding styles and best practices",
      image_url: "rubocop.png",
      url: "https://rubocop.org/"
    },
    // {
    //   name: "Node.js",
    //   description: "A runtime environment that allows executing JavaScript code on the server side",
    //   image_url: "node.png",
    //   url: "https://nodejs.org/fr/about"
    // },
    // {
    //   name: "Express.js",
    //   description: "A minimal and flexible web application framework for Node.js",
    //   image_url: "express.png",
    //   url: "https://expressjs.com/"
    // },
    // {
    //   name: "AdonisJS",
    // eslint-disable-next-line max-len, vue/max-len
    //   description: "A full-featured web application framework for Node.js that follows conventions for building applications",
    //   image_url: "adonis.png",
    //   url: "https://adonisjs.com/"
    // },
    // {
    //   name: "Golang",
    // eslint-disable-next-line max-len, vue/max-len
    //   description: "A statically typed programming language known for its efficiency, simplicity, and strong performance characteristics",
    //   image_url: "golang.png",
    //   url: "https://go.dev/"
    // },
    // {
    //   name: "MongoDB",
    //   description: "A popular NoSQL database system that stores data in a flexible, document-oriented format",
    //   image_url: "mongodb.png",
    //   url: "https://www.mongodb.com/"
    // },
    {
      name: "PostgreSQL",
      description: " An open-source relational database management system",
      image_url: "postgresql.png",
      url: "https://www.postgresql.org/"
    },
    // {
    //   name: "Prisma",
    //   description: "An open-source database toolkit that simplifies database access and management",
    //   image_url: "prisma.png",
    //   url: "https://www.prisma.io/"
    // },
    {
      name: "Fly.io",
      description: "A platform for deploying and scaling applications globally",
      image_url: "flyio.png",
      url: "https://fly.io/"
    }
  ]

  const otherTools = [
    {
      name: "Git",
      // eslint-disable-next-line max-len, vue/max-len
      description: "A distributed version control system designed to track changes in source code during software development",
      image_url: "git.png",
      url: "https://git-scm.com/"
    },
    {
      name: "Github",
      description: "A web-based hosting service for Git repositories",
      image_url: "github.png",
      url: "https://github.com/"
    },
    // {
    //   name: "Docker",
    //   description: "A platform for developing, shipping, and running applications in containers",
    //   image_url: "docker.png",
    //   url: "https://www.docker.com/"
    // },
    {
      name: "VSCode",
      description: "A lightweight yet powerful source code editor developed by Microsoft",
      image_url: "vscode.png",
      url: "https://code.visualstudio.com/"
    },
    {
      name: "WSL2",
      description: "A compatibility layer that enables running a Linux kernel and user space on Windows",
      image_url: "linux.png",
      url: "https://learn.microsoft.com/en-us/windows/wsl/"
    }
  ]

  return { frontendTools, backendTools, otherTools }
})
