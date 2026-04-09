import { LeuTabGroup } from "./TabGroup.js"

export { LeuTabGroup }

LeuTabGroup.define("leu-tab-group")

declare global {
  interface HTMLElementTagNameMap {
    "leu-tab-group": LeuTabGroup
  }
}
