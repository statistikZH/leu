import { LeuProgressBar } from "./ProgressBar.js"

export { LeuProgressBar }

LeuProgressBar.define("leu-progress-bar")

declare global {
  interface HTMLElementTagNameMap {
    "leu-progress-bar": LeuProgressBar
  }
}
