import { html } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./[name].css"

/**
 * @tagname [namespace]-[name]
 */
export class Leu[Name] extends LeuElement {
  static styles = styles

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    value: { type: String },
  }

  constructor() {
    super()
  }

  render() {
    return html`
      <p>Hello ${this.tagName}</p>
    `
  }
}
