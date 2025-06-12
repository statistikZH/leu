import { LeuAccordion } from "./Accordion.js"

export { LeuAccordion }

LeuAccordion.define("leu-accordion")

declare global {
  interface HTMLElementTagNameMap {
    "leu-accordion": LeuAccordion
  }
}
