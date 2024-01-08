import { html, LitElement } from "lit"
import styles from "./[name].css"

/**
 * @tagname [namespace]-[name]
 */
export class Leu[Name] extends LitElement {
  static styles = styles

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
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
