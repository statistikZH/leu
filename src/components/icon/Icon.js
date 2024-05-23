import { html, svg, LitElement } from "lit"
import styles from "./icon.css"
import { paths } from "./paths.js"

/**
 * A component to render all defined zhWeb icons.
 * The `fill` of the icon is set to `currentColor` and
 * can be overriden by setting the css `color` property.
 *
 * @tagname leu-icon
 * @prop {import("./paths").IconPathName} name - The name of the icon to display.
 * @prop {number} size - Width and height of the icon. A icon will always be displayed as a square.
 */
export class LeuIcon extends LitElement {
  static styles = styles

  static properties = {
    name: { type: String, reflect: true },
    size: { type: Number, reflect: true },
  }

  constructor() {
    super()

    /**
     * @type {import("./paths").IconPathName}
     */
    this.name = "addNew"
    this.size = 24
  }

  render() {
    const iconPath = paths[this.name]

    return html`
      <svg
        width="${this.size}"
        height="${this.size}"
        fill="currentColor"
        viewBox="0 0 24 24"
        fill-rule="evenodd"
      >
        ${svg`<path d=${iconPath} />`}
      </svg>
    `
  }
}
