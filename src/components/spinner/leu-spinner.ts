import { LeuSpinner } from "./Spinner.js"

export { LeuSpinner }

LeuSpinner.define("leu-spinner")

declare global {
  interface HTMLElementTagNameMap {
    "leu-spinner": LeuSpinner
  }
}
