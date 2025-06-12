import { LeuIcon } from "./Icon.js"

export { LeuIcon }

LeuIcon.define("leu-icon")

declare global {
  interface HTMLElementTagNameMap {
    "leu-icon": LeuIcon
  }
}
