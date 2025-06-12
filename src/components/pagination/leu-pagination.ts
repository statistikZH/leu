import { LeuPagination } from "./Pagination.js"

export { LeuPagination }

LeuPagination.define("leu-pagination")

declare global {
  interface HTMLElementTagNameMap {
    "leu-pagination": LeuPagination
  }
}
