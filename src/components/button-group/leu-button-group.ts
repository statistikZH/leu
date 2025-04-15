import { LeuButtonGroup } from "./ButtonGroup.js"

export { LeuButtonGroup }

LeuButtonGroup.define("leu-button-group")

declare global {
  interface HTMLElementTagNameMap {
    "leu-button-group": LeuButtonGroup
  }
}
