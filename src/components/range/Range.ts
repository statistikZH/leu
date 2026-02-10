import { html, nothing } from "lit"

import { property } from "lit/decorators.js"
import styles from "./range.css"
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

/**
 * @tagname leu-range
 */
export class LeuRange extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @property({ converter: defaultValueConverter, attribute: "value" })
  defaultValue = [50]

  /**
   * The minimum value of the range slider.
   */
  @property({ type: Number, reflect: true })
  min: number = 0

  /**
   * The maximum value of the range slider.
   */
  @property({ type: Number, reflect: true })
  max: number = 100

  /**
   * The step size of the range slider.
   */
  @property({ type: Number, reflect: true })
  step: number = 1

  @property({ type: String, reflect: true })
  name: string = ""

  /**
   * The label of the range slider.
   */
  @property({ type: String, reflect: true })
  label: string = ""

  /**
   * Whether to hide the label of the range slider.
   * If true, the label will still be available for screen readers
   * and is only visually hidden.
   */
  @property({ type: Boolean, reflect: true, attribute: "hide-label" })
  hideLabel: boolean = false

  /**
   * Whether the range slider is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  /**
   * Whether to use a range with two handles.
   */
  @property({ type: Boolean, reflect: true })
  multiple: boolean = false

  /**
   * Wheter to show tick marks below the range slider.
   * One tick mark per step will be rendered.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-ticks" })
  showTicks: boolean = false

  /**
   * Whether to show the min and max labels below the range slider.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-range-labels" })
  showRangeLabels: boolean = false

  /**
   * A prefix to display before the value in the output element(s).
   * Is ignored if a custom valueFormatter is provided.
   */
  @property({ type: String, reflect: true })
  prefix: string = ""

  /**
   * A suffix to display after the value in the output element(s).
   * Is ignored if a custom valueFormatter is provided.
   */
  @property({ type: String, reflect: true })
  suffix: string = ""

  /**
   * A custom function to format the value displayed in the output element(s).
   * If provided, the prefix and suffix properties will be ignored.
   */
  @property({ attribute: false })
  valueFormatter?: (value: number) => string

  updated() {
    this._updateStyles()
  }

  protected get _inputs() {
    // If shadowRoot is not yet ready:
    if (!this.shadowRoot) return []
    return Array.from(
      this.shadowRoot.querySelectorAll<HTMLInputElement>("input"),
    )
  }

  protected _updateStyles() {
    const normalizedRange = this._getNormalizedRange()
    this.style.setProperty("--low", normalizedRange[0].toString())
    this.style.setProperty("--high", normalizedRange[1].toString())

    const inputs = this.multiple
      ? [this._getBaseInput(), this._getGhostInput()]
      : [this._getBaseInput()]

    inputs.forEach((input) => {
      const output = this.shadowRoot.querySelector<HTMLOutputElement>(
        `.output[for=${input.id}]`,
      )
      const normalizedValue = this._getNormalizedValue(input.valueAsNumber)
      output.style.setProperty("--value", normalizedValue.toString())
      output.value = this.formatValue(input.valueAsNumber)
    })
  }

  get value() {
    const inputs = this._inputs

    // FALLBACK: If Inputs is missing in the DOM, we return defaultValue.
    if (inputs.length === 0) {
      return this.defaultValue.join(",")
    }

    return inputs.map((input) => input.value).join(",")
  }

  /**
   * Sets the value of the underlying input element(s).
   * The value has to be an array if "multiple" range is used.
   * Otherwise it has to be a string.
   */
  set value(value: string | Array<string>) {
    if (this.multiple && Array.isArray(value)) {
      const inputs = this._inputs

      value.forEach((v, i) => {
        inputs[i].value = v
      })
      this._updateStyles()
    } else if (!this.multiple) {
      this._getBaseInput().value = value as string
      this._updateStyles()
    }
  }

  get valueAsArray() {
    return this._inputs.map((input) => input.valueAsNumber)
  }

  get valueLow() {
    const inputs = this._inputs

    if (this.multiple) {
      return inputs.map((input) => input.valueAsNumber).sort((a, b) => a - b)[0]
    }

    return inputs[0].value
  }

  get valueHigh() {
    const inputs = this._inputs

    if (this.multiple) {
      return inputs.map((input) => input.valueAsNumber).sort((a, b) => a - b)[1]
    }

    return inputs[0].value
  }

  protected _getBaseInput() {
    return this.shadowRoot.querySelector<HTMLInputElement>(".range--base")
  }

  protected _getGhostInput() {
    return this.shadowRoot.querySelector<HTMLInputElement>(".range--ghost")
  }

  protected _handleInput(
    _index: number,
    _e: InputEvent & { target: HTMLInputElement },
  ) {
    this._updateStyles()
  }

  protected _getNormalizedValue(value: number) {
    return (value - this.min) / (this.max - this.min)
  }

  protected _getNormalizedRange() {
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
   */
  protected _handlePointerDown(e: PointerEvent & { target: HTMLInputElement }) {
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

  protected formatValue(value: number) {
    if (this.valueFormatter) {
      return this.valueFormatter(value)
    }

    return `${this.prefix}${value}${this.suffix}`
  }

  protected renderTicks() {
    if (!this.showTicks) {
      return nothing
    }

    return html`<div class="ticks">
      ${Array.from(
        { length: (this.max - this.min) / this.step + 1 },
        (_, i) => this.min + i * this.step,
      ).map(
        (tick) =>
          html`<span
            class="tick"
            style="left: ${this._getNormalizedValue(tick) * 100}%"
          ></span>`,
      )}
    </div>`
  }

  render() {
    const inputs = this.multiple ? ["base", "ghost"] : ["base"]

    const { multiple, disabled, label, defaultValue } = this

    return html`
      <div
        class="container"
        role=${multiple ? "group" : undefined}
        aria-labelledby=${multiple ? "group-label" : undefined}
      >
        ${multiple
          ? html`<span id="group-label" class="label">${label}</span>`
          : html`<label for="input-base" class="label">${label}</label>`}
        <div class="outputs">
          ${inputs.map(
            (type, index) =>
              html`<output
                class="output"
                for="input-${type}"
                value=${this.formatValue(defaultValue[index])}
              ></output>`,
          )}
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
                min=${this.min}
                max=${this.max}
                step=${this.step}
                aria-label=${multiple ? RANGE_LABELS[index] : undefined}
                ?disabled=${disabled}
                .value=${defaultValue[index].toString()}
              />
            `,
          )}
          ${this.renderTicks()}
        </div>
      </div>
      ${this.showRangeLabels
        ? html`<div class="tick-labels">
            <span class="tick-label tick-label--min"
              >${this.formatValue(this.min)}</span
            >
            <span class="tick-label tick-label--max"
              >${this.formatValue(this.max)}</span
            >
          </div>`
        : nothing}
    `
  }
}
