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

const RANGE_LABELS = ["Von", "Bis"]

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
  }

  updated() {
    this._updateStyles()
  }

  _updateStyles() {
    const normalizedRange = this._getNormalizedRange()
    this.style.setProperty("--low", normalizedRange[0].toString())
    this.style.setProperty("--high", normalizedRange[1].toString())

    const inputs = this.multiple
      ? [this._getBaseInput(), this._getGhostInput()]
      : [this._getBaseInput()]

    inputs.forEach((input) => {
      /** @type {HTMLOutputElement} */
      const output = this.shadowRoot.querySelector(`.output[for=${input.id}]`)
      const normalizedValue = this._getNormalizedValue(input.valueAsNumber)
      output.style.setProperty("--value", normalizedValue.toString())
      output.value = input.value
    })
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
   * @returns {HTMLInputElement | null}
   */
  _getBaseInput() {
    return this.shadowRoot.querySelector(".range--base")
  }

  /**
   * @returns {HTMLInputElement | null}
   */
  _getGhostInput() {
    return this.shadowRoot.querySelector(".range--ghost")
  }

  /**
   *
   * @param {number} _index
   * @param {InputEvent & {target: HTMLInputElement}} _e
   */
  _handleInput(_index, _e) {
    this._updateStyles()
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
      return this.valueAsArray
        .map((value) => this._getNormalizedValue(value))
        .sort((a, b) => a - b)
    }

    return [0, this._getNormalizedValue(this.valueAsArray[0])]
  }

  /**
   * Determine if the "click" (pointer event) is closer the
   * the value of the other input element. Swap the values if this is the case.
   * @param {PointerEvent & {target: HTMLInputElement}} e
   */
  _handlePointerDown(e) {
    const clickValue =
      this.min + ((this.max - this.min) * e.offsetX) / this.offsetWidth
    const middleValue = (this.valueAsArray[0] + this.valueAsArray[1]) / 2

    if (
      (e.target.valueAsNumber === this.valueLow) ===
      clickValue > middleValue
    ) {
      /**
       * As the pointerdown event is fired before the input event, we first overwrite the value
       * of the input element that was not clicked on. The active input element will update itself.
       */
      // this._value = [e.target.valueAsNumber, e.target.valueAsNumber]
      this._getGhostInput().value = e.target.value
    }
  }

  render() {
    const inputs = this.multiple ? ["base", "ghost"] : ["base"]

    const { multiple } = this

    return html`
      <div
        role=${multiple ? "group" : undefined}
        aria-labelledby=${multiple ? "group-label" : undefined}
      >
        ${multiple
          ? html`<span id="group-label" class="label">${this.label}</span>`
          : html`<label for="input-base" class="label">${this.label}</label>`}
        <div class="outputs">
          ${inputs.map(
            (type, index) =>
              html`<output
                class="output"
                for="input-${type}"
                value=${this.defaultValue[index]}
              ></output>`
          )}
        </div>
        <div class="inputs">
          ${inputs.map(
            (type, index) =>
              html`
                <input
                  @input=${(e) => this._handleInput(index, e)}
                  @pointerdown=${this.multiple && !this.disabled && index === 0
                    ? this._handlePointerDown
                    : undefined}
                  type="range"
                  class="range range--${type}"
                  id="input-${type}"
                  name=${this.name}
                  min=${this.min}
                  max=${this.max}
                  step=${this.step}
                  aria-label=${multiple ? RANGE_LABELS[index] : undefined}
                  ?disabled=${this.disabled}
                  .value=${this.defaultValue[index].toString()}
                />
              `
          )}
        </div>
      </div>
    `
  }
}
