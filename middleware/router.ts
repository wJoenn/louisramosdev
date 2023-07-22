// eslint-disable-next-line consistent-return
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/blogs/vite_rails") {
    return navigateTo("/blogs/ruby-on-rails-7-and-vite", { redirectCode: 301 })
  }
})
