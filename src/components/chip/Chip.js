import { LitElement } from "lit"
import styles from "./chip.css"

export class LeuChipBase extends LitElement {
  static styles = styles

  /** @internal */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    inverted: { type: Boolean },
  }

  constructor() {
    super()

    this.inverted = false
  }
}
