import { html, css, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"

export class LeuCheckboxGroup extends LitElement {
  static styles = css`
    :host {
      --group-font-regular: var(--leu-font-regular);
      --group-font-black: var(--leu-font-black);

      font-family: var(--group-font-regular);
    }

    .fieldset {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 0.5rem 1rem;

      border: none;
      padding: 0;
    }

    .fieldset--vertical {
      flex-direction: column;
      gap: 1rem;
    }

    .legend {
      font-family: var(--group-font-black);
      font-size: 1.125rem;
      line-height: 1.5;

      margin-bottom: 0.5rem;
    }
  `

  static properties = {
    orientation: { type: String },
  }

  constructor() {
    super()
    this.orientation = "HORIZONTAL"
    this.items = []
  }

  get value() {
    const checkedValues = this.items
      .filter((i) => i.checked)
      .map((i) => i.value)
    return checkedValues.length > 0 ? checkedValues[0] : ""
  }

  connectedCallback() {
    super.connectedCallback()
    this.handleItems()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeItemEventListeners()
  }

  addItemEventListeners() {
    this.items.forEach((item) => {
      item.addEventListener("input", this.handleInput)
    })
  }

  removeItemEventListeners() {
    this.items.forEach((item) => {
      item.removeEventListener("input", this.handleInput)
    })
  }

  handleSlotChange() {
    this.handleItems()
  }

  handleInput = () => {
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }))
  }

  handleItems() {
    this.removeItemEventListeners()
    this.items = [...this.querySelectorAll(":scope > *:not([slot])")]
    this.addItemEventListeners()
  }

  render() {
    const fieldsetClasses = {
      fieldset: "true",
      "fieldset--vertical": this.orientation === "VERTICAL",
    }

    return html`
      <fieldset class=${classMap(fieldsetClasses)}>
        <legend class="legend"><slot name="legend"></slot></legend>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>
    `
  }
}
