import { LeuRadio } from "./Radio.js"

export { LeuRadio }

LeuRadio.define("leu-radio")

declare global {
  interface HTMLElementTagNameMap {
    "leu-radio": LeuRadio
  }
}
