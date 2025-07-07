import { html } from "lit"
import { property, state } from "lit/decorators.js"
import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./tab-button.css"

/**
 * Tab Button.
 *
 * @prop {string} name - Name to link Button and Panel together
 * @prop {boolean} active - Is active
 * @prop {boolean} disabled - Not clickable
 *
 * @tagname leu-tab-button
 */
export class LeuTabButton extends LeuElement {
  static styles = [LeuElement.styles, styles]

  @state()
  private _name = ""

  @property({ type: String, reflect: true })
  set name(value: string) {
    this._name = value
    this.setAttribute("aria-controls", this.disabled ? undefined : this.name)
  }

  get name() {
    return this._name
  }

  @state()
  private _active = false

  @property({ type: Boolean, reflect: true })
  set active(value: boolean) {
    this.ariaSelected = value ? "true" : "false"
    this.tabIndex = value ? 0 : -1
    this._active = value
  }

  get active() {
    return this._active
  }

  @property({ type: Boolean, reflect: true })
  disabled = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute("role", "tab")
  }

  render() {
    return html` <slot></slot> `
  }
}
