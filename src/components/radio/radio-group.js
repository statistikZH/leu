import { html, css, LitElement } from "lit"

export class LeuRadioGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      gap: 1.5rem;
    }
  `

  static properties = {
    value: { type: Array },
  }

  connectedCallback() {
    this.handleItems()
    this.addEventListener("input", this.handleInput)
  }

  disconnectedCallback() {
    this.removeEventListener("input", this.handleInput)
  }

  handleInput(e) {
    console.log(this)
    if (e.target.checked) {
      // this.items.filter(item => item !== e.target).forEach(item => {
      // item.checked = false
      // })
    }
  }

  handleItems() {
    this.items = [...this.querySelectorAll(":scope > *:not([slot])")]
  }

  render() {
    return html`
        <fieldset>
					<legend><slot name="legend"></legend>
					<slot></slot>
        </fieldset>
      `
  }
}
