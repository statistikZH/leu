import { html } from "lit"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./spinner.css?inline"

/**
 * @tagname leu-spinner
 * @cssprop --leu-spinner-size - The size of the spinner.
 */
export class LeuSpinner extends LeuElement {
  static styles = [LeuElement.styles, styles]

  render() {
    return html`
      <svg
        class="spinner"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 56 56"
        role="presentation"
      >
        <path
          d="M13.8579 13.858c7.8105-7.8105 20.4737-7.8105 28.2842 0 7.8105 7.8104 7.8105 20.4737 0 28.2842-7.8105 7.8105-20.4737 7.8105-28.2842 0-4.3487-4.3486-6.2761-10.2016-5.7824-15.8838"
          stroke="currentColor"
          stroke-width="3"
        />
      </svg>
    `
  }
}
