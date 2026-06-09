import { property } from "lit/decorators.js"
import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./chip.css?inline"

export class LeuChipBase extends LeuElement {
  static styles = [LeuElement.styles, styles]

  /** @internal */
  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @property({ type: Boolean, reflect: true })
  inverted: boolean = false
}
