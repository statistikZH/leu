import { LeuVisuallyHidden } from "./VisuallyHidden.js"

export { LeuVisuallyHidden }

LeuVisuallyHidden.define("leu-visually-hidden")

declare global {
  interface HTMLElementTagNameMap {
    "leu-visually-hidden": LeuVisuallyHidden
  }
}
