import { LeuMessage } from "./Message.js"

export { LeuMessage }

LeuMessage.define("leu-message")

declare global {
  interface HTMLElementTagNameMap {
    "leu-message": LeuMessage
  }
}
