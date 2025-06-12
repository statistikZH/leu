import { LeuChipSelectable } from "./ChipSelectable.js"

export { LeuChipSelectable }

LeuChipSelectable.define("leu-chip-selectable")

declare global {
  interface HTMLElementTagNameMap {
    "leu-chip-selectable": LeuChipSelectable
  }
}
