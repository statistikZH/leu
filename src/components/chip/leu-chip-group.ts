import { LeuChipGroup } from "./ChipGroup.js"

export { LeuChipGroup }

LeuChipGroup.define("leu-chip-group")

declare global {
  interface HTMLElementTagNameMap {
    "leu-chip-group": LeuChipGroup
  }
}
