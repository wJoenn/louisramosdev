import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library, config } from "@fortawesome/fontawesome-svg-core"

import { faAt } from "@fortawesome/free-solid-svg-icons"

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

config.autoAddCss = false

library.add(faAt, faGithub, faLinkedin)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("fai", FontAwesomeIcon)
})
