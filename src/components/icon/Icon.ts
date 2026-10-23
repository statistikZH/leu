import { html, PropertyValues, svg } from "lit"
import { property, state } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./icon.css?inline"
import { IconPathName, resolver } from "./paths.js"

/**
 * A component to render all defined zhWeb icons.
 * The `fill` of the icon is set to `currentColor` and
 * can be overriden by setting the css `color` property.
 * If the icon name is not found, a placeholder will be displayed.
 *
 * @tagname leu-icon
 * @cssprop --leu-icon-size - The size of the icon.
 */
export class LeuIcon extends LeuElement {
  static styles = [LeuElement.styles, styles]

  /**
   * The name of the icon to display.
   */
  @property({ type: String, reflect: true })
  name: IconPathName | "" = ""

  @state()
  private iconPath = ""

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("name")) {
      this.loadIcon(this.name)
    }
  }

  private async loadIcon(name: IconPathName | "") {
    if (name === "") {
      this.iconPath = ""
      return
    }

    let iconPath: string
    try {
      iconPath = await resolver(name)
    } catch {
      iconPath = ""
    }

    // Ignore results of stale requests that resolve after the name changed
    if (this.name === name) {
      this.iconPath = iconPath
    }
  }

  render() {
    if (this.iconPath === "") {
      return html`<div class="placeholder"></div>`
    }

    return html`
      <svg
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
        fill-rule="evenodd"
        role="presentation"
      >
        ${svg`<path d=${this.iconPath} />`}
      </svg>
    `
  }
}
