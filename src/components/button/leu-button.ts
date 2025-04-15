import { LeuButton } from "./Button.js"

export { LeuButton }

LeuButton.define("leu-button")

declare global {
  interface HTMLElementTagNameMap {
    "leu-button": LeuButton
  }
}
