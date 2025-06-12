import { LeuRange } from "./Range.js"

export { LeuRange }

LeuRange.define("leu-range")

declare global {
  interface HTMLElementTagNameMap {
    "leu-range": LeuRange
  }
}
