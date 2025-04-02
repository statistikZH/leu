import { LeuAccordion } from "./Accordion.ts"

export { LeuAccordion }

LeuAccordion.define("leu-accordion")

declare global {
  interface HTMLElementTagNameMap {
    "leu-accordion": LeuAccordion
  }
}
