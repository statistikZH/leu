import { html } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./tag.css"

/**
 * @tagname leu-tag
 * @cssprop --leu-tag-accent-color - The color of the tag
 * @slot default - The label of the tag
 * @slot icon - An icon to display in the tag
 */
export class LeuTag extends LeuElement {
  static styles = [LeuElement.styles, styles]

  @property({ type: String })
  variant: "solid" | "outline" | "ghost" = "solid"

  render() {
    return html`
      <div class="tag tag--${this.variant}">
        <slot class="tag__icon" name="icon"></slot>
        <slot class="tag__label"></slot>
      </div>
    `
  }
}
