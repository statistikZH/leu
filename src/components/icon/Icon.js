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
 * @cssprop --leu-icon-size - The size of the icon.
 */
export class LeuIcon extends LitElement {
  static styles = styles

  static properties = {
    name: { type: String, reflect: true },
  }

  constructor() {
    super()

    /**
     * @type {import("./paths").IconPathName}
     */
    this.name = "addNew"
  }

  render() {
    const iconPath = paths[this.name]

    return html`
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        fill-rule="evenodd"
      >
        ${svg`<path d=${iconPath} />`}
      </svg>
    `
  }
}
