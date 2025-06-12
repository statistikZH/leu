import { LeuInput } from "./Input.js"

export { LeuInput }

LeuInput.define("leu-input")

declare global {
  interface HTMLElementTagNameMap {
    "leu-input": LeuInput
  }
}
