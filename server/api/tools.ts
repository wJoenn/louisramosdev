export default defineEventHandler(() => {
  const frontendTools = [
    { name: "Sass",
      description: "A CSS preprocessor with features like variables, nesting, mixins, and more",
      image_url: "/assets/images/logos/sass.png",
      url: "https://sass-lang.com/"
    },
    { name: "PostCSS",
      description: "A tool for transforming CSS with JavaScript",
      image_url: "/assets/images/logos/postcss.png",
      url: "https://postcss.org/"
    },
    { name: "Stimulus",
      description: "A minimalistic JavaScript framework by Hotwire",
      image_url: "/assets/images/logos/stimulus.png",
      url: "https://stimulus.hotwired.dev/"
    },
    { name: "TypeScript",
      description: "A superset of JavaScript that adds static type checking",
      image_url: "/assets/images/logos/typescript.png",
      url: "https://www.typescriptlang.org/"
    },
    { name: "Vue.js",
      description: "A progressive JavaScript framework for building user interfaces",
      image_url: "/assets/images/logos/vue.png",
      url: "https://vuejs.org/"
    },
    { name: "Nuxt",
      description: "A meta-framework for Vue.js that provides SSR, routing, and other powerful features",
      image_url: "/assets/images/logos/nuxt.png",
      url: "https://nuxt.com/"
    },
    { name: "Pinia",
      description: "A state management solution for Vue.js applications",
      image_url: "/assets/images/logos/pinia.png",
      url: "https://pinia.vuejs.org/"
    },
    { name: "Vite",
      description: "A lightning-fast JavaScript bundler and development server",
      image_url: "/assets/images/logos/vite.png",
      url: "https://vitejs.dev/"
    },
    { name: "Yarn",
      description: "A fast and reliable package manager for JavaScript projects",
      image_url: "/assets/images/logos/yarn.png",
      url: "https://classic.yarnpkg.com/en/"
    },
    { name: "esLint",
      description: "A configurable JavaScript linter to enforce code quality and best practices",
      image_url: "/assets/images/logos/eslint.png",
      url: "https://eslint.org/"
    },
    { name: "Netlify",
      description: "A powerful hosting platform and continuous deployment solution for web applications",
      image_url: "/assets/images/logos/netlify.png",
      url: "https://www.netlify.com/"
    }
  ]

  const backendTools = [
    { name: "Ruby",
      description: "An object-oriented language known for its simplicity and readability",
      image_url: "/assets/images/logos/ruby.png",
      url: "https://www.ruby-lang.org/en/"
    },
    { name: "Sinatra",
      description: "A lightweight web application framework for Ruby",
      image_url: "/assets/images/logos/sinatra.png",
      url: "https://sinatrarb.com/"
    },
    { name: "Ruby on Rails",
      description: "A batteries included full-stack web framework built on Ruby",
      image_url: "/assets/images/logos/rails.png",
      url: "https://rubyonrails.org/"
    },
    { name: "RSpec",
      description: "A behavior-driven development framework for writing expressive and readable tests",
      image_url: "/assets/images/logos/rspec.png",
      url: "https://rspec.info/"
    },
    { name: "Rubocop",
      description: "A code analyzer for Ruby that enforces consistent coding styles and best practices",
      image_url: "/assets/images/logos/rubocop.png",
      url: "https://rubocop.org/"
    },
    { name: "PostgreSQL",
      description: " An open-source relational database management system",
      image_url: "/assets/images/logos/postgresql.png",
      url: "https://www.postgresql.org/"
    },
    { name: "Fly.io",
      description: "A platform for deploying and scaling applications globally",
      image_url: "/assets/images/logos/flyio.png",
      url: "https://fly.io/"
    }
  ]

  const otherTools = [
    { name: "Git",
      // eslint-disable-next-line max-len, vue/max-len
      description: "A distributed version control system designed to track changes in source code during software development",
      image_url: "/assets/images/logos/git.png",
      url: "https://git-scm.com/"
    },
    { name: "Github",
      description: "A web-based hosting service for Git repositories",
      image_url: "/assets/images/logos/github.png",
      url: "https://github.com/"
    },
    { name: "VSCode",
      description: "A lightweight yet powerful source code editor developed by Microsoft",
      image_url: "/assets/images/logos/vscode.png",
      url: "https://code.visualstudio.com/"
    },
    { name: "WSL2",
      description: "A compatibility layer that enables running a Linux kernel and user space on Windows",
      image_url: "/assets/images/logos/linux.png",
      url: "https://learn.microsoft.com/en-us/windows/wsl/"
    }
  ]

  return { frontendTools, backendTools, otherTools }
})
