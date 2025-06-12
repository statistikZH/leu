import { LeuScrollTop } from "./ScrollTop.js"

export { LeuScrollTop }

LeuScrollTop.define("leu-scroll-top")

declare global {
  interface HTMLElementTagNameMap {
    "leu-scroll-top": LeuScrollTop
  }
}
