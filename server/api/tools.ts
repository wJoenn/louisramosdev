export default defineEventHandler(() => {
  const backendTools = [
    {
      description: "An object-oriented language known for its simplicity and readability",
      image_url: "ruby.png",
      name: "Ruby",
      url: "https://www.ruby-lang.org/en/"
    },
    {
      description: "A lightweight web application framework for Ruby",
      image_url: "sinatra.png",
      name: "Sinatra",
      url: "https://sinatrarb.com/"
    },
    {
      description: "A batteries included full-stack web framework built on Ruby",
      image_url: "rails.png",
      name: "Ruby on Rails",
      url: "https://rubyonrails.org/"
    },
    {
      description: "A behavior-driven development framework for writing expressive and readable tests",
      image_url: "rspec.png",
      name: "RSpec",
      url: "https://rspec.info/"
    },
    {
      description: "A code analyzer for Ruby that enforces consistent coding styles and best practices",
      image_url: "rubocop.png",
      name: "Rubocop",
      url: "https://rubocop.org/"
    },
    // {
    //   description: "A runtime environment that allows executing JavaScript code on the server side",
    //   image_url: "node.png",
    //   name: "Node.js",
    //   url: "https://nodejs.org/fr/about"
    // },
    // {
    //   description: "A minimal and flexible web application framework for Node.js",
    //   image_url: "express.png",
    //   name: "Express.js",
    //   url: "https://expressjs.com/"
    // },
    // {
    // eslint-disable-next-line @stylistic/js/max-len
    //   description: "A full-featured web application framework for Node.js that follows conventions for building applications",
    //   image_url: "adonis.png",
    //   name: "AdonisJS",
    //   url: "https://adonisjs.com/"
    // },
    // {
    // eslint-disable-next-line @stylistic/js/max-len
    //   description: "A statically typed programming language known for its efficiency, simplicity, and strong performance characteristics",
    //   image_url: "golang.png",
    //   name: "Golang",
    //   url: "https://go.dev/"
    // },
    // {
    //   description: "A popular NoSQL database system that stores data in a flexible, document-oriented format",
    //   image_url: "mongodb.png",
    //   name: "MongoDB",
    //   url: "https://www.mongodb.com/"
    // },
    {
      description: " An open-source relational database management system",
      image_url: "postgresql.png",
      name: "PostgreSQL",
      url: "https://www.postgresql.org/"
    },
    // {
    //   description: "An open-source database toolkit that simplifies database access and management",
    //   image_url: "prisma.png",
    //   name: "Prisma",
    //   url: "https://www.prisma.io/"
    // },
    {
      description: "A platform for deploying and scaling applications globally",
      image_url: "flyio.png",
      name: "Fly.io",
      url: "https://fly.io/"
    }
  ]

  const frontendTools = [
    {
      description: "A CSS preprocessor with features like variables, nesting, mixins, and more",
      image_url: "sass.png",
      name: "Sass",
      url: "https://sass-lang.com/"
    },
    {
      description: "A highly customizable, utility-first CSS framework that provides a set of pre-built CSS classes.",
      image_url: "tailwindcss.png",
      name: "TailwindCSS",
      url: "https://tailwindcss.com/"
    },
    {
      description: "A tool for transforming CSS with JavaScript",
      image_url: "postcss.png",
      name: "PostCSS",
      url: "https://postcss.org/"
    },
    {
      description: "A superset of JavaScript that adds static type checking",
      image_url: "typescript.png",
      name: "TypeScript",
      url: "https://www.typescriptlang.org/"
    },
    {
      description: "A progressive JavaScript framework for building user interfaces",
      image_url: "vue.png",
      name: "Vue.js",
      url: "https://vuejs.org/"
    },
    {
      description: "A meta-framework for Vue.js that provides SSR, routing, and other powerful features",
      image_url: "nuxt.png",
      name: "Nuxt",
      url: "https://nuxt.com/"
    },
    {
      description: "A state management solution for Vue.js applications",
      image_url: "pinia.png",
      name: "Pinia",
      url: "https://pinia.vuejs.org/"
    },
    // {
    //   description: "A data-fetching and state management library for Vue.js applications",
    //   image_url: "vue_query.png",
    //   name: "Vue Query",
    //   url: "https://vue-query.vercel.app/#/"
    // },
    {
      description: "A lightning-fast JavaScript bundler and development server",
      image_url: "vite.png",
      name: "Vite",
      url: "https://vitejs.dev/"
    },
    {
      description: "A lightweight and intuitive testing library build on Vite",
      image_url: "vitest.png",
      name: "Vitest",
      url: "https://vitest.dev/"
    },
    // {
    //   description: "An end-to-end testing framework for web applications",
    //   image_url: "cypress.png",
    //   name: "Cypress",
    //   url: "https://www.cypress.io/"
    // },
    {
      description: "A configurable JavaScript linter to enforce code quality and best practices",
      image_url: "eslint.png",
      name: "esLint",
      url: "https://eslint.org/"
    },
    {
      description: "A package manager for JavaScript projects that emphasizes speed and disk space efficiency",
      image_url: "pnpm.png",
      name: "PNPM",
      url: "https://pnpm.io/"
    },
    // {
    //   description: "A fast JavaScript runtime, package manager, bundler and test runner",
    //   image_url: "bun.png",
    //   name: "Bun",
    //   url: "https://bun.sh/"
    // },
    {
      description: "A platform that provides the tools, workflows, and infrastructure to build and deploy web apps",
      image_url: "vercel.png",
      name: "Vercel",
      url: "https://vercel.com/"
    }
  ]

  const otherTools = [
    {
      // eslint-disable-next-line @stylistic/js/max-len
      description: "A distributed version control system designed to track changes in source code during software development",
      image_url: "git.png",
      name: "Git",
      url: "https://git-scm.com/"
    },
    {
      description: "A web-based hosting service for Git repositories",
      image_url: "github.png",
      name: "Github",
      url: "https://github.com/"
    },
    // {
    //   description: "A platform for developing, shipping, and running applications in containers",
    //   image_url: "docker.png",
    //   name: "Docker",
    //   url: "https://www.docker.com/"
    // },
    {
      description: "A lightweight yet powerful source code editor developed by Microsoft",
      image_url: "vscode.png",
      name: "VSCode",
      url: "https://code.visualstudio.com/"
    },
    {
      description: "A compatibility layer that enables running a Linux kernel and user space on Windows",
      image_url: "linux.png",
      name: "WSL2",
      url: "https://learn.microsoft.com/en-us/windows/wsl/"
    }
  ]

  return { backendTools, frontendTools, otherTools }
})
