import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library, config } from "@fortawesome/fontawesome-svg-core"

import { faAt, faRotateLeft } from "@fortawesome/free-solid-svg-icons"

import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

config.autoAddCss = false

library.add(faAt, faRotateLeft, faGithub, faLinkedin)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("fai", FontAwesomeIcon)
})
