import { LitElement } from "lit"
import styles from "./chip.css"

/* Design: https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=21161-184433&mode=design&t=Kjo5VDiqivihn8dh-11 */

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
