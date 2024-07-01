import { html, svg } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"

// @ts-ignore
import styles from "./icon.css"
import { paths } from "./paths.js"

/**
 * A component to render all defined zhWeb icons.
 * The `fill` of the icon is set to `currentColor` and
 * can be overriden by setting the css `color` property.
 * If the icon name is not found, a placeholder will be displayed.
 *
 * @tagname leu-icon
 * @prop {import("./paths").IconPathName} name - The name of the icon to display.
 * @cssprop --leu-icon-size - The size of the icon.
 */
export class LeuIcon extends LeuElement {
  static styles = styles

  static properties = {
    name: { type: String, reflect: true },
  }

  constructor() {
    super()

    /**
     * @type {import("./paths").IconPathName | ""}
     */
    this.name = ""
  }

  render() {
    if (!paths[this.name]) {
      return html`<div class="placeholder"></div>`
    }

    const iconPath = paths[this.name]

    return html`
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        fill-rule="evenodd"
        role="presentation"
      >
        ${svg`<path d=${iconPath} />`}
      </svg>
    `
  }
}
