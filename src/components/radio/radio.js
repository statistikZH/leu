import { html, css, LitElement } from "lit"

export class LeuRadio extends LitElement {
  static styles = css`
    :host {
      --radio-color: var(--leu-color-black-40);
      --radio-color-disabled: var(--leu-color-black-20);
      --radio-color-focus: var(--leu-color-func-cyan);

      --radio-label-color: var(--leu-color-black-100);
      --radio-label-color-disabled: var(--radio-color-disabled);

      --radio-font-regular: var(--leu-font-regular);

      display: inline-flex;
      align-items: flex-start;
      gap: 0.5rem;

      font-family: var(--radio-font-regular);
    }

    .radio {
      --_length: 1.5rem;
      appearance: none;
      border: 2px solid var(--radio-color);
      width: var(--_length);
      height: var(--_length);
      border-radius: 50%;
      margin: 0;

      flex: 1 0 var(--_length);

      display: grid;
      place-items: center;
    }

    .radio::before {
      content: "";
      width: 0.75rem;
      height: 0.75rem;

      border-radius: 50%;
      background-color: var(--radio-color);

      transform: scale(0);
    }

    .radio:checked::before {
      transform: scale(1);
    }

    .radio:is(:hover, :checked, :focus) {
      --radio-color: var(--radio-color-focus);
    }

    .radio:focus-visible {
      outline: 2px solid var(--radio-color-focus);
      outline-offset: 2px;
    }

    .radio:disabled {
      --radio-color: var(--radio-color-disabled);
    }

    .label {
      color: var(--radio-label-color);
      font-size: 1rem;
      line-height: 1.5;
    }

    .radio:disabled + .label {
      --radio-label-color: var(--radio-label-color-disabled);
    }
  `

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    identifier: { type: String },
    value: { type: String },
    name: { type: String },
  }

  constructor() {
    super()
    this.checked = false
    this.disabled = false
  }

  handleChange(event) {
    this.checked = event.target.checked

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  handleInput(event) {
    this.checked = event.target.checked

    // const customEvent = new CustomEvent(event.type, {...event, bubbles: true, composed: true, target: this});
    // this.dispatchEvent(customEvent)
  }

  render() {
    return html`
      <input
        id=${this.identifier}
        class="radio"
        type="radio"
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        .checked=${this.checked}
        ?disabled=${this.disabled}
        .value=${this.value}
      />
      <label for=${this.identifier} class="label"><slot></slot></label>
    `
  }
}
