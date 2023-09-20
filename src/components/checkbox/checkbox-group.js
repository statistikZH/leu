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
    return this.items.filter((i) => i.checked).map((i) => i.value)
  }

  handleSlotChange() {
    this.handleItems()
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
        <legend class="legend"><slot name="legend"></slot></legend>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>
    `
  }
}
