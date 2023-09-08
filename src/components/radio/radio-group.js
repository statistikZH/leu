import { html, css, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"

export class LeuRadioGroup extends LitElement {
  static styles = css`
    :host {
      --group-font-regular: var(--leu-font-regular);
      --group-font-black: var(--leu-font-black);

      font-family: var(--group-font-regular);
    }

    .fieldset {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;

      border: none;
      padding: 0;
    }

    .fieldset--vertical {
      flex-direction: column;
      gap: 0.5rem;
    }

    .legend {
      font-family: var(--group-font-black);
    }
  `

  static properties = {
    value: { type: String },
    orientation: { type: String },
  }

  constructor() {
    super()
    this.value = ""
    this.orientation = "HORIZONTAL"
  }

  connectedCallback() {
    super.connectedCallback()
    this.handleItems()
    this.items.forEach((item) =>
      item.addEventListener("input", this.handleInput)
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.items.forEach((item) =>
      item.removeEventListener("input", this.handleInput)
    )
  }

  handleInput = (e) => {
    if (e.target.checked) {
      this.setValue(e.target.value)
      this.items
        .filter((item) => item !== e.target)
        .forEach((item) => {
          item.checked = false // eslint-disable-line no-param-reassign
        })
    } else {
      this.setValue("")
    }
  }

  setValue(value) {
    this.value = value
    this.dispatchEvent(new Event("input", { bubbles: true }))
  }

  handleItems() {
    this.items = [...this.querySelectorAll(":scope > *:not([slot])")]
  }

  render() {
    const fieldsetClasses = {
      fieldset: "true",
      "fieldset--vertical": this.orientation === "VERTICAL",
    }

    return html`
        <fieldset class=${classMap(fieldsetClasses)}>
					<legend class="legend"><slot name="legend"></legend>
					<slot></slot>
        </fieldset>
      `
  }
}
