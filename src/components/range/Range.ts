import { html, nothing, PropertyValues } from "lit"
import { property, query } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"

import styles from "./range.css"
import { LeuElement } from "../../lib/LeuElement.js"
import { clamp, isNumber } from "../../lib/utils.js"

type InternalRangeValue = [number, number] | [number]

const defaultValueConverter = {
  fromAttribute(value: string) {
    return value.split(",").map((v) => Number(v.trim()))
  },
  toAttribute(value: number[]) {
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

  /**
   * The default value of the range slider.
   * String input is parsed as a comma-separated list of numbers.
   */
  @property({
    converter: defaultValueConverter,
    attribute: "value",
    reflect: true,
  })
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

  protected _value: InternalRangeValue = this.defaultValue.map((v) =>
    this.clampAndRoundValue(v),
  ) as InternalRangeValue

  /**
   * The value of the range slider.
   * String input is parsed as a comma-separated list of numbers.
   * In multiple mode, if only a single value is provided, the second handle will be set to the minimum value.
   * In single mode, only the first value will be used.
   */
  @property({ attribute: false })
  set value(value: string | number | Array<string | number>) {
    let nextValue: Array<number> = []

    if (typeof value === "string") {
      nextValue = value
        .split(",")
        .map((v) => Number(v.trim()))
        .filter(isNumber)
    } else if (isNumber(value)) {
      nextValue = [value]
    } else if (Array.isArray(value)) {
      nextValue = value.map((v: unknown) => Number(v)).filter(isNumber)
    }

    if (nextValue.length === 0) {
      return
    }

    // In multiple mode, we need to ensure that we always have two values.
    // `min` is a fallback for the second value.
    if (this.multiple && nextValue.length === 1) {
      nextValue.unshift(this.min)
    }

    this._value = nextValue
      .slice(0, this.multiple ? 2 : 1)
      .map((v) => this.clampAndRoundValue(v)) as InternalRangeValue
  }

  get value(): string {
    return this._value.join(",")
  }

  get valueAsArray(): InternalRangeValue {
    return this._value.slice() as InternalRangeValue
  }

  get valueLow(): number {
    return Math.min(...this._value)
  }

  get valueHigh(): number {
    return Math.max(...this._value)
  }

  @query("#container")
  protected container: HTMLDivElement

  @query("#input-base")
  protected inputBase: HTMLInputElement

  @query("#input-ghost")
  protected inputGhost: HTMLInputElement | null

  @query("output[for=input-base]")
  protected outputBase: HTMLOutputElement

  @query("output[for=input-ghost]")
  protected outputGhost: HTMLOutputElement | null

  updated() {
    this.updateStyles()
  }

  protected willUpdate(changedProperties: PropertyValues<this>): void {
    // Reflect defaultValue changes to the value property
    // to ensure backwards compatibility with previous versions
    if (changedProperties.has("defaultValue")) {
      this.value = this.defaultValue.map((v) =>
        this.clampAndRoundValue(v),
      ) as InternalRangeValue
    }

    if (
      changedProperties.has("min") ||
      changedProperties.has("max") ||
      changedProperties.has("step")
    ) {
      this._value = this._value.map((v) =>
        this.clampAndRoundValue(v),
      ) as InternalRangeValue
    }

    if (changedProperties.has("multiple") && this.multiple) {
      // When switching to multiple mode, ensure that we have two values
      if (this._value.length === 1) {
        this._value = [this.min, this._value[0]]
      }
    } else if (changedProperties.has("multiple") && !this.multiple) {
      // When switching to single mode, keep only the lower value
      this._value = [this.valueLow]
    }
  }

  protected updateStyles() {
    const normalizedRange = this.getNormalizedRange()
    this.container?.style.setProperty("--low", normalizedRange[0].toString())
    this.container?.style.setProperty("--high", normalizedRange[1].toString())

    const inputs = this.multiple
      ? [this.inputBase, this.inputGhost]
      : [this.inputBase]

    inputs.forEach((input) => {
      const output =
        input.id === "input-base" ? this.outputBase : this.outputGhost
      const normalizedValue = this.getNormalizedValue(input.valueAsNumber)
      output.style.setProperty("--value", normalizedValue.toString())
      output.value = this.formatValue(input.valueAsNumber)
    })
  }

  protected clampAndRoundValue(value: number) {
    const clampedValue = clamp(value, this.min, this.max)
    const roundedValue =
      Math.round((clampedValue - this.min) / this.step) * this.step + this.min

    return roundedValue
  }

  protected handleInput(e: Event & { target: HTMLInputElement }) {
    e.stopPropagation()

    if (this.multiple) {
      this.value = [this.inputBase.valueAsNumber, this.inputGhost.valueAsNumber]
    } else {
      this.value = [this.inputBase.valueAsNumber]
    }

    this.dispatchEvent(
      new CustomEvent("input", {
        composed: true,
        bubbles: true,
        detail: { value: this.value, valueAsArray: this.valueAsArray },
      }),
    )
  }

  protected getNormalizedValue(value: number) {
    return (value - this.min) / (this.max - this.min)
  }

  protected getNormalizedRange() {
    if (this.multiple) {
      return this.valueAsArray
        .map((value) => this.getNormalizedValue(value))
        .sort((a, b) => a - b)
    }

    return [0, this.getNormalizedValue(this.valueAsArray[0])]
  }

  /**
   * This event handler is only applied to the "base" input element and only when in "multiple" mode.
   * It handles pointer events on the *track* and the thumb.
   * This method determines if the interaction was closer to the base or the ghost input.
   */
  protected handlePointerDown(e: PointerEvent & { target: HTMLInputElement }) {
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
      this.inputGhost.value = e.target.value
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
            style="left: ${this.getNormalizedValue(tick) * 100}%"
          ></span>`,
      )}
    </div>`
  }

  render() {
    const inputs = this.multiple ? ["base", "ghost"] : ["base"]

    const { multiple, disabled, label, valueAsArray } = this

    return html`
      <div
        id="container"
        class="container"
        role=${ifDefined(multiple ? "group" : undefined)}
        aria-labelledby=${ifDefined(multiple ? "group-label" : undefined)}
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
                value=${this.formatValue(valueAsArray[index])}
              ></output>`,
          )}
        </div>
        <div class="inputs">
          ${inputs.map(
            (type, index) => html`
              <input
                @input=${this.handleInput}
                @pointerdown=${multiple && !disabled && index === 0
                  ? this.handlePointerDown
                  : undefined}
                type="range"
                class="range range--${type}"
                id="input-${type}"
                name=${this.name}
                min=${this.min}
                max=${this.max}
                step=${this.step}
                aria-label=${ifDefined(
                  multiple ? RANGE_LABELS[index] : undefined,
                )}
                ?disabled=${disabled}
                .value=${valueAsArray[index].toString()}
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
