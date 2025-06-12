import { LeuDropdown } from "./Dropdown.js"

export { LeuDropdown }

LeuDropdown.define("leu-dropdown")

declare global {
  interface HTMLElementTagNameMap {
    "leu-dropdown": LeuDropdown
  }
}
