import { html, PropertyValues, svg } from "lit"
import { property, state } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./icon.css?inline"
import { IconPathName, resolver } from "./paths.js"

/**
 * Paths of icons that have already been loaded, shared by all instances
 * so that subsequent icons with the same name render synchronously.
 */
const iconPathCache = new Map<IconPathName, string>()

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

  private iconLoad: Promise<void> = Promise.resolve()

  private resolveIconLoad?: () => void

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("name")) {
      // Release waiters of an obsolete load so they don't wait for it to settle
      this.resolveIconLoad?.()

      this.iconLoad = new Promise((resolve) => {
        this.resolveIconLoad = resolve
        this.loadIcon(this.name).finally(resolve)
      })
    }
  }

  /**
   * Resolves after the icon path has been loaded and rendered.
   */
  protected async getUpdateComplete(): Promise<boolean> {
    let result = await super.getUpdateComplete()
    let iconLoad: Promise<void>
    // Wait again if the name changed while a load was pending
    do {
      iconLoad = this.iconLoad
      await iconLoad
      // Setting the loaded path schedules another update
      result = (await super.getUpdateComplete()) && result
    } while (iconLoad !== this.iconLoad)
    return result
  }

  private async loadIcon(name: IconPathName | "") {
    if (name === "") {
      this.iconPath = ""
      return
    }

    // Set cached paths synchronously so they are part of the current update
    const cachedPath = iconPathCache.get(name)
    if (cachedPath !== undefined) {
      this.iconPath = cachedPath
      return
    }

    // Show the placeholder instead of the previous icon while loading
    this.iconPath = ""

    let iconPath: string
    try {
      iconPath = await resolver(name)
      iconPathCache.set(name, iconPath)
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
