import { property } from "lit/decorators.js"
import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./chip.css"

/* Design: https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=21161-184433&mode=design&t=Kjo5VDiqivihn8dh-11 */

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
