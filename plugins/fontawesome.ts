import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library, config } from "@fortawesome/fontawesome-svg-core"
import {
  faAt,
  faBook,
  faBookOpen,
  faCheckDouble,
  faChevronDown,
  faCodeFork,
  faCopy,
  faLocationDot,
  faTag,
  faUpRightFromSquare,
  faXmark
} from "@fortawesome/free-solid-svg-icons"
import { faFaceSmile, faStar } from "@fortawesome/free-regular-svg-icons"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

config.autoAddCss = false

library.add(
  faAt,
  faBook,
  faBookOpen,
  faCheckDouble,
  faChevronDown,
  faCodeFork,
  faCopy,
  faLocationDot,
  faTag,
  faUpRightFromSquare,
  faXmark,
  faFaceSmile,
  faStar,
  faGithub,
  faLinkedin
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("fai", FontAwesomeIcon)
})
