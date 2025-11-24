import { LeuTag } from "./Tag.js"

export { LeuTag }

LeuTag.define("leu-tag")

declare global {
  interface HTMLElementTagNameMap {
    "leu-tag": LeuTag
  }
}
