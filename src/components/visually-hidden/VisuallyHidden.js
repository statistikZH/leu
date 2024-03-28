import { html, LitElement } from "lit"
import styles from "./visually-hidden.css"

/**
 * @tagname leu-visually-hidden
 */
export class LeuVisuallyHidden extends LitElement {
  static styles = styles

  render() {
    return html`<slot></slot>`
  }
}
