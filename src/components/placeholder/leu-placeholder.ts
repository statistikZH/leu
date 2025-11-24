import { LeuPlaceholder } from "./Placeholder.js"

export { LeuPlaceholder }

LeuPlaceholder.define("leu-placeholder")

declare global {
  interface HTMLElementTagNameMap {
    "leu-placeholder": LeuPlaceholder
  }
}
