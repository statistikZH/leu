import { html, css, LitElement } from "lit"

export class LeuInput extends LitElement {
  static styles = css`
    :host {
      font-family: var(--leu-font-regular);
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;

      position: relative;
    }

    .input {
      --_color: #949494;
      appearance: none;
      border: 2px solid var(--_color);
      border-radius: 1px;
      color: #000000;

      padding: 2.25rem 1rem 1rem;
    }

    .input::before {
      content: "";
      width: 0.75rem;
      height: 0.75rem;

      border-radius: 50%;
      background-color: var(--_color);

      transform: scale(0);

      font-size: 1rem;
      line-height: 1.5;
    }

    .input:checked::before {
      transform: scale(1);
    }

    .input:hover,
    .input:focus {
      --_color: #009ee0;
    }

    .input:focus-visible {
      outline: 2px solid var(--_color);
      outline-offset: 2px;
    }

    .input:disabled {
      --_color: rgba(0, 0, 0, 0.2);
      color: var(--_color);
    }

    .label {
      color: #00000099;
      font-size: 1rem;
      line-height: 1.5;

      position: absolute;
      top: 1.5rem;
      left: 1rem;

      transition: 0.15s ease-out;
      transition-property: font-size, top;
    }

    .input:focus + .label,
    .input:not(.input--empty) + .label {
      font-size: 0.75rem;
      font-weight: bold;
      top: 0.75rem;
      color: #000;
    }

    .input:disabled + .label {
      color: #00000066;
    }
  `

  static properties = {
    disabled: { type: Boolean, reflect: true },
    required: { type: Boolean, reflect: true },
    clearable: { type: Boolean, reflect: true },

    identifier: { type: String },
    value: { type: String },
    name: { type: String },

    label: { type: String },
    pattern: { type: String },
    prefix: { type: String },
    suffix: { type: String },
  }

  constructor() {
    super()

    this.disabled = false
    this.clearable = false

    this.identifier = crypto.randomUUID()
    this.value = ""
    this.name = ""

    this.label = ""
    this.pattern = ""
    this.prefix = ""
    this.suffix = ""
  }

  handleChange(event) {
    this.value = event.target.value

    const customEvent = new CustomEvent(event.type, event)
    this.dispatchEvent(customEvent)
  }

  handleInput(event) {
    this.value = event.target.value

    // const customEvent = new CustomEvent(event.type, {...event, bubbles: true, composed: true, target: this});
    // this.dispatchEvent(customEvent)
  }

  render() {
    const inputClasses = ["input", this.value === "" ? "input--empty" : ""]
    return html`
      <input
        id=${this.identifier}
        class=${inputClasses.join(" ")}
        type="text"
        name="${this.name}"
        @change=${this.handleChange}
        @input=${this.handleInput}
        ?disabled=${this.disabled}
        .value=${this.value}
      />
      <label for=${this.identifier} class="label"><slot></slot></label>
    `
  }
}
