import { LeuTable } from "./Table.js"

export { LeuTable }

LeuTable.define("leu-table")

declare global {
  interface HTMLElementTagNameMap {
    "leu-table": LeuTable
  }
}
