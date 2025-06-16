import { html } from "lit"
import { property } from "lit/decorators.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./[name].css"

/**
 * @tagname [namespace]-[name]
 */
export class Leu[Name] extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @property({ type: String })
  value: string = ""

  constructor() {
    super()
  }

  render() {
    return html`
      <p>Hello ${this.tagName}</p>
    `
  }
}
