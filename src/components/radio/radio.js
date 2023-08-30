import { html, css, LitElement } from "lit"

export class LeuRadio extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .radio {
      --_color: #949494;
      appearance: none;
      border: 2px solid var(--_color);
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;

      display: grid;
      place-items: center;
    }

    .radio::before {
      content: "";
      width: 0.75rem;
      height: 0.75rem;

      border-radius: 50%;
      background-color: var(--_color);

      transform: scale(0);
    }

    .radio:checked::before {
      transform: scale(1);
    }

    .radio:hover,
    .radio:checked {
      --_color: #009ee0;
    }

    .radio:disabled {
      --_color: rgba(0, 0, 0, 0.2);
    }

    .label {
      color: #000;
      font-size: 1rem;
      line-height: 1.5;
      margin-top: 0.25rem;
    }

    .radio:disabled + .label {
      color: #00000066;
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
