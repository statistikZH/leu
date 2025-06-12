import { LeuRadioGroup } from "./RadioGroup.js"

export { LeuRadioGroup }

LeuRadioGroup.define("leu-radio-group")

declare global {
  interface HTMLElementTagNameMap {
    "leu-radio-group": LeuRadioGroup
  }
}
