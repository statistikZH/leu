import { LeuSearch } from "./Search.js"

export { LeuSearch }

LeuSearch.define("leu-search")

declare global {
  interface HTMLElementTagNameMap {
    "leu-search": LeuSearch
  }
}
