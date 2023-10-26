import { html, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./dropdown.css"

import { defineButtonElements } from "../button/Button.js"
import { defineMenuElements } from "../menu/Menu.js"
import { defineMenuItemElements } from "../menu/MenuItem.js"

/**
 * @tagname leu-dropdown
 */
export class LeuDropdown extends LitElement {
  static styles = styles

  static properties = {
    label: { type: String },
    expanded: { type: Boolean, reflect: true },
  }

  constructor() {
    super()

    this.label = ""
    this.expanded = false
  }

  handleClick() {
    this.expanded = !this.expanded
  }

  render() {
    return html`
      <leu-button
        icon="download"
        variant="ghost"
        label=${this.label}
        expanded=${this.expanded ? "open" : "closed"}
        aria-expanded=${this.expanded ? "true" : "false"}
        aria-controls="content"
        ?active=${this.expanded}
        @click=${this.handleClick}
      ></leu-button>
      <div id="content" class="content" ?hidden=${!this.expanded}>
        <slot></slot>
      </div>
    `
  }
}

export function defineDropdownElements() {
  defineElement("dropdown", LeuDropdown)
  defineButtonElements()
  defineMenuElements()
  defineMenuItemElements()
}
