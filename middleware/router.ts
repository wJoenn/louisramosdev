// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/blogs/vite_rails") {
    return navigateTo("/blogs/ruby-on-rails-7-and-vite", { redirectCode: 301 })
  }

  if (to.path === "/blogs/send-mails-on-rails-7-with-gmail") {
    return navigateTo("/blogs/send-mail-on-rails-7-with-gmail", { redirectCode: 301 })
  }
})
