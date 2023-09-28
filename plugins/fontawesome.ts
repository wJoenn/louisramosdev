import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library, config } from "@fortawesome/fontawesome-svg-core"
import {
  faAt,
  faBookOpen,
  faCheckDouble,
  faChevronDown,
  faCopy,
  faTag,
  faUpRightFromSquare,
  faXmark
} from "@fortawesome/free-solid-svg-icons"
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

config.autoAddCss = false

library.add(
  faAt,
  faBookOpen,
  faCheckDouble,
  faChevronDown,
  faCopy,
  faTag,
  faUpRightFromSquare,
  faXmark,
  faFaceSmile,
  faGithub,
  faLinkedin
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("fai", FontAwesomeIcon)
})
