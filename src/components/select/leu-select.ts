import { LeuSelect } from "./Select.js"

export { LeuSelect }

LeuSelect.define("leu-select")

declare global {
  interface HTMLElementTagNameMap {
    "leu-select": LeuSelect
  }
}
