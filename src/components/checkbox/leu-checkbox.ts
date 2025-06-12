import { LeuCheckbox } from "./Checkbox.js"

export { LeuCheckbox }

LeuCheckbox.define("leu-checkbox")

declare global {
  interface HTMLElementTagNameMap {
    "leu-checkbox": LeuCheckbox
  }
}
