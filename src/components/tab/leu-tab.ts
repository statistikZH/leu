import { LeuTab } from "./Tab.js"

export { LeuTab }

LeuTab.define("leu-tab")

declare global {
  interface HTMLElementTagNameMap {
    "leu-tab": LeuTab
  }
}
