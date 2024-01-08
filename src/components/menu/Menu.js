import { html, LitElement } from "lit"
import styles from "./menu.css"

/**
 * @tagname leu-menu
 */
export class LeuMenu extends LitElement {
  static styles = styles

  render() {
    return html`<slot></slot>`
  }
}
