import { LeuFileInput } from "./FileInput.js"

export { LeuFileInput }

LeuFileInput.define("leu-file-input")

declare global {
  interface HTMLElementTagNameMap {
    "leu-file-input": LeuFileInput
  }
}
