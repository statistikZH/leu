import { html, LitElement } from "lit"
import { styleMap } from "lit/directives/style-map.js"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./sticky.css"

/**
 * @tagname leu-sticky
 */
export class LeuSticky extends LitElement {
  static styles = styles

  static properties = {
    top: { type: Number },
  }

  constructor() {
    super()
    this.top = 0
  }

  render() {
    const style = styleMap({ top: `${this.top}px` })
    return html`
      <div class="sticky" style=${style}>
        <slot></slot>
      </div>
    `
  }
}

export function defineStickyElements() {
  defineElement("sticky", LeuSticky)
}
