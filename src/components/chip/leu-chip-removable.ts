import { LeuChipRemovable } from "./ChipRemovable.js"

export { LeuChipRemovable }

LeuChipRemovable.define("leu-chip-removable")

declare global {
  interface HTMLElementTagNameMap {
    "leu-chip-removable": LeuChipRemovable
  }
}
