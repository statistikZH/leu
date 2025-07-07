import { LeuTabButton } from "./TabButton.js"

export { LeuTabButton }

LeuTabButton.define("leu-tab-button")

declare global {
  interface HTMLElementTagNameMap {
    "leu-tab-button": LeuTabButton
  }
}
