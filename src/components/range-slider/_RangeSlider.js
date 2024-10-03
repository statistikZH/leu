import { html } from "lit"
import styles from "./range-slider.css"
import { LeuElement } from "../../lib/LeuElement.js"

const defaultValueConverter = {
  fromAttribute(value) {
    return value.split(",").map((v) => Number(v.trim()))
  },
  toAttribute(value) {
    return value.join(",")
  },
}

export class LeuRangeSlider extends LeuElement {
  static styles = styles

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static properties = {
    defaultValue: { converter: defaultValueConverter, attribute: "value" },
    min: { type: Number, reflect: true },
    max: { type: Number, reflect: true },
    step: { type: Number, reflect: true },
    name: { type: String, reflect: true },
    label: { type: String, reflect: true },
    disabled: { type: Boolean, reflect: true },
    multiple: { type: Boolean, reflect: true },
    _value: { state: true },
  }

  constructor() {
    super()
    this.defaultValue = [50]
    this.min = 0
    this.max = 100
    this.step = 1
    this.name = ""
    this.label = ""
    this.disabled = false
    this.multiple = true
    this._value = []
  }

  updated(changedProperties) {
    if (changedProperties.has("defaultValue")) {
      this._value = this.defaultValue.slice()
    }
  }

  get value() {
    const inputs = Array.from(this.shadowRoot.querySelectorAll("input"))
    return inputs.map((input) => input.value).join(",")
  }

  get valueAsArray() {
    return Array.from(this.shadowRoot.querySelectorAll("input")).map(
      (input) => input.valueAsNumber
    )
  }

  get valueLow() {
    const inputs = Array.from(this.shadowRoot.querySelectorAll("input"))

    if (this.multiple) {
      return inputs.map((input) => input.valueAsNumber).sort((a, b) => a - b)[0]
    }

    return inputs[0].value
  }

  get valueHigh() {
    const inputs = Array.from(this.shadowRoot.querySelectorAll("input"))

    if (this.multiple) {
      return inputs.map((input) => input.valueAsNumber).sort((a, b) => a - b)[1]
    }

    return inputs[0].value
  }

  /**
   *
   * @param {number} index
   * @param {InputEvent & {target: HTMLInputElement}} e
   */
  _handleInput(index, e) {
    console.log("input")
    const newValue = this._value.slice()
    newValue[index] = e.target.value

    this._value = newValue
  }

  /**
   *
   * @param {number} value
   * @returns {number}
   */
  _getNormalizedValue(value) {
    return (value - this.min) / (this.max - this.min)
  }

  _getNormalizedRange() {
    if (this.multiple) {
      return this._value
        .map((value) => this._getNormalizedValue(value))
        .sort((a, b) => a - b)
    }

    return [this.min, this._getNormalizedValue(this._value[0])]
  }

  _handlePointerDown(e) {
    const clickValue =
      this.min + ((this.max - this.min) * e.offsetX) / this.offsetWidth
    const middleValue = (this._value[0] + this._value[1]) / 2
    if (clickValue > middleValue) {
      // Click is closer to input element and we swap thumbs
      const newValue = this._value.slice()
      newValue[0] = clickValue
      this._value = newValue
    }
  }

  render() {
    const inputs = this.multiple ? [0, 1] : [0]

    return html`
      <label for="input">${this.label}</label>
      ${inputs.map(
        (value, index) =>
          html` <div>
            <output for="input-${index}">${this._value[index]}</output>
            <br />
            <input
              @input=${(e) => this._handleInput(index, e)}
              @pointerdown=${(e) => this._handlePointerDown(e)}
              type="range"
              class="range"
              id="input-${index}"
              name=${this.name}
              min=${this.min}
              max=${this.max}
              step=${this.step}
              ?disabled=${this.disabled}
              .value=${this._value[index]}
              style="--low: ${this._getNormalizedRange()[0]}; --high: ${this._getNormalizedRange()[1]}"
            />
          </div>`
      )}
    `
  }
}
