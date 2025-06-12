import { LeuChipLink } from "./ChipLink.js"

export { LeuChipLink }

LeuChipLink.define("leu-chip-link")

declare global {
  interface HTMLElementTagNameMap {
    "leu-chip-link": LeuChipLink
  }
}
