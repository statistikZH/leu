import { LeuTabPanel } from "./TabPanel.js"

export { LeuTabPanel }

LeuTabPanel.define("leu-tab-panel")

declare global {
  interface HTMLElementTagNameMap {
    "leu-tab-panel": LeuTabPanel
  }
}
