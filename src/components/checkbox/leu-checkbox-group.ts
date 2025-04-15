import { LeuCheckboxGroup } from "./CheckboxGroup.js"

export { LeuCheckboxGroup }

LeuCheckboxGroup.define("leu-checkbox-group")

declare global {
  interface HTMLElementTagNameMap {
    "leu-checkbox-group": LeuCheckboxGroup
  }
}
