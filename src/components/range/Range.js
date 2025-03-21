import { html } from "lit"
import { LeuElement } from "../../lib/LeuElement.js"

// @ts-ignore
import styles from "./range.css"

const defaultValueConverter = {
  fromAttribute(value, type) {
    if (type === Array) {
      try {
        const parsed = JSON.parse(value)
        if (Array.isArray(parsed)) {
          return parsed
        }
      } catch (e) {
        return value.split(",").map((v) => v.trim())
      }
    }
    return value.split(",").map((v) => Number(v.trim()))
  },
  toAttribute(value) {
    if (Array.isArray(value)) {
      return JSON.stringify(value)
    }
    return value.join(",")
  },
}

const optionsConverter = {
  fromAttribute(value) {
    try {
      const parsed = JSON.parse(value)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (e) {
      return value.split(",").map((v) => v.trim())
    }
    return []
  },
  toAttribute(value) {
    return JSON.stringify(value)
  },
}

const RANGE_LABELS = ["Von", "Bis"]

/**
 * @tagname leu-range
 */
export class LeuRange extends LeuElement {
  static styles = [LeuElement.styles, styles]

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
    options: { converter: optionsConverter, attribute: "options" },
  }

  constructor() {
    super()
    this.defaultValue = [0]
    this.min = 0
    this.max = 100
    this.step = 1
    this.name = ""
    this.label = ""
    this.disabled = false
    this.multiple = false
    this.options = null
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
      output.value = this.options
        ? this.options[input.valueAsNumber]
        : input.value
    })
  }

  get value() {
    const inputs = Array.from(this.shadowRoot.querySelectorAll("input"))
    const indices = inputs.map((input) => input.valueAsNumber)

    if (this.options) {
      // Sort the indices before mapping to values
      indices.sort((a, b) => a - b)
      return indices.map((index) => this.options[index]).join(",")
    }

    // Sort the values before joining
    return indices
      .sort((a, b) => a - b)
      .map((value) => value)
      .join(",")
  }

  /**
   * Sets the value of the underlying input element(s).
   * The value has to be an array if "multiple" range is used.
   * Otherwise it has to be a string.
   * @param {string | Array} value
   */
  set value(value) {
    if (this.multiple && Array.isArray(value)) {
      const inputs = Array.from(this.shadowRoot.querySelectorAll("input"))
      value.forEach((v, i) => {
        if (this.options) {
          inputs[i].value = this.options.indexOf(v)
        } else {
          inputs[i].value = v
        }
      })
      this._updateStyles()
    } else if (!this.multiple && typeof value === "string") {
      if (this.options) {
        this._getBaseInput().value = this.options.indexOf(value)
      } else {
        this._getBaseInput().value = value
      }
      this._updateStyles()
    }
  }

  get valueAsArray() {
    const inputs = Array.from(this.shadowRoot.querySelectorAll("input"))
    const indices = inputs.map((input) => input.valueAsNumber)

    if (this.options) {
      // Sort the indices before mapping to values
      indices.sort((a, b) => a - b)
      return indices.map((index) => this.options[index])
    }

    // Sort the values before returning
    return indices.sort((a, b) => a - b).map((value) => value)
  }

  get valueLow() {
    const inputs = Array.from(this.shadowRoot.querySelectorAll("input"))

    if (this.multiple) {
      return inputs
        .map((input) =>
          this.options
            ? this.options[input.valueAsNumber]
            : input.valueAsNumber,
        )
        .sort((a, b) =>
          this.options
            ? this.options.indexOf(a) - this.options.indexOf(b)
            : a - b,
        )[0]
    }

    return this.options
      ? this.options[inputs[0].valueAsNumber]
      : inputs[0].value
  }

  get valueHigh() {
    const inputs = Array.from(this.shadowRoot.querySelectorAll("input"))

    if (this.multiple) {
      return inputs
        .map((input) =>
          this.options
            ? this.options[input.valueAsNumber]
            : input.valueAsNumber,
        )
        .sort((a, b) =>
          this.options
            ? this.options.indexOf(a) - this.options.indexOf(b)
            : a - b,
        )[1]
    }

    return this.options
      ? this.options[inputs[0].valueAsNumber]
      : inputs[0].value
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
    if (this.options) {
      return value / (this.options.length - 1)
    }
    return (value - this.min) / (this.max - this.min)
  }

  _getNormalizedRange() {
    if (this.multiple) {
      return this.valueAsArray
        .map((value) => {
          if (this.options) {
            return this._getNormalizedValue(this.options.indexOf(value))
          }
          return this._getNormalizedValue(value)
        })
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
    const clickValue = this.options
      ? Math.round(((this.options.length - 1) * e.offsetX) / this.offsetWidth)
      : this.min + ((this.max - this.min) * e.offsetX) / this.offsetWidth
    const middleValue =
      (this.options
        ? this.options.indexOf(this.valueAsArray[0])
        : this.valueAsArray[0] + this.valueAsArray[1]) / 2

    if (
      (e.target.valueAsNumber ===
        (this.options
          ? this.options.indexOf(this.valueLow)
          : this.valueLow)) ===
      (this.options
        ? clickValue > this.options.indexOf(middleValue)
        : clickValue > middleValue)
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

    const { multiple, disabled, label, defaultValue, options } = this

    const rangeMin = options ? 0 : this.min
    const rangeMax = options ? options.length - 1 : this.max
    const rangeStep = options ? 1 : this.step

    // Determine the default values based on options and multiple
    let adjustedDefaultValue
    if (options && multiple) {
      if (
        defaultValue &&
        Array.isArray(defaultValue) &&
        defaultValue.length >= 2
      ) {
        adjustedDefaultValue = defaultValue
      } else {
        adjustedDefaultValue = [0, options.length - 1] // First and last indices
      }
    } else {
      adjustedDefaultValue = defaultValue
    }

    return html`
      <div
        role=${multiple ? "group" : undefined}
        aria-labelledby=${multiple ? "group-label" : undefined}
      >
        ${multiple
          ? html`<span id="group-label" class="label">${label}</span>`
          : html`<label for="input-base" class="label">${label}</label>`}
        <div class="outputs">
          ${inputs.map((type, index) => {
            let outputValue = ""
            if (
              options &&
              adjustedDefaultValue &&
              adjustedDefaultValue[index] !== undefined
            ) {
              outputValue = String(options[adjustedDefaultValue[index]])
            } else if (
              adjustedDefaultValue &&
              adjustedDefaultValue[index] !== undefined
            ) {
              outputValue = String(adjustedDefaultValue[index])
            }
            return html`<output
              class="output"
              for="input-${type}"
              value=${outputValue}
            ></output>`
          })}
        </div>
        <div class="inputs">
          ${inputs.map(
            (type, index) => html`
              <input
                @input=${(e) => this._handleInput(index, e)}
                @pointerdown=${multiple && !disabled && index === 0
                  ? this._handlePointerDown
                  : undefined}
                type="range"
                class="range range--${type}"
                id="input-${type}"
                name=${this.name}
                min=${rangeMin}
                max=${rangeMax}
                step=${rangeStep}
                aria-label=${multiple ? RANGE_LABELS[index] : undefined}
                ?disabled=${disabled}
                .value=${adjustedDefaultValue &&
                adjustedDefaultValue[index] !== undefined
                  ? adjustedDefaultValue[index].toString()
                  : "0"}
              />
            `,
          )}
        </div>
      </div>
    `
  }
}
