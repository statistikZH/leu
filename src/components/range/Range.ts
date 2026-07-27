import { html, nothing, PropertyValues } from "lit"
import { property, query } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"

import styles from "./range.css?inline"
import { LeuElement } from "../../lib/LeuElement.js"
import { clamp, isNumber } from "../../lib/utils.js"
import { LeuVisuallyHidden } from "../visually-hidden/VisuallyHidden.js"

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
const THUMB_RADIUS = 16

/**
 * @tagname leu-range
 */
export class LeuRange extends LeuElement {
  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static dependencies = {
    "leu-visually-hidden": LeuVisuallyHidden,
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
    if (this.multiple) {
      return [this.valueLow, this.valueHigh]
    } else {
      return [this._value[0]]
    }
  }

  get valueLow(): number {
    return Math.min(...this._value)
  }

  get valueHigh(): number {
    return Math.max(...this._value)
  }

  @query("#container")
  protected container!: HTMLDivElement

  @query("#track")
  protected track!: HTMLDivElement

  protected activePointerId: number | null = null

  protected activeThumbIndex: number | null = null

  protected resizeObserver = new ResizeObserver(() => {
    this.trackRect = this.track.getBoundingClientRect()
  })

  protected trackRect: DOMRect | null = null

  disconnectedCallback(): void {
    super.disconnectedCallback()
    this.resizeObserver.disconnect()
  }

  protected firstUpdated(): void {
    this.resizeObserver.observe(this.track)
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

  protected clampAndRoundValue(value: number) {
    // The `max` value could technically be unreachable if the range between `min` and `max` is not a multiple of `step`.
    // To ensure that new value is in every case a multiple of `step` away from `min`,
    // we need to round the `max` value down to the nearest multiple of `step`.
    const roundedMax = this.max - ((this.max - this.min) % this.step)

    const clampedValue = clamp(value, this.min, roundedMax)
    const roundedValue =
      Math.round((clampedValue - this.min) / this.step) * this.step + this.min

    return roundedValue
  }

  protected dispatchInputEvent() {
    this.dispatchEvent(
      new CustomEvent("input", {
        composed: true,
        bubbles: true,
        detail: { value: this.value, valueAsArray: this.valueAsArray },
      }),
    )
  }

  protected async handleKeyDown(e: KeyboardEvent, index: number) {
    if (this.disabled) return

    const key = e.key

    const currentValue = this._value[index]
    let nextValue

    if (currentValue === undefined) return

    switch (key) {
      case "ArrowLeft":
      case "ArrowDown":
        nextValue = currentValue - this.step
        break
      case "PageDown":
        nextValue = currentValue - this.step * 10
        break
      case "ArrowRight":
      case "ArrowUp":
        nextValue = currentValue + this.step
        break
      case "PageUp":
        nextValue = currentValue + this.step * 10
        break
      case "Home":
        nextValue = this.min
        break
      case "End":
        nextValue = this.max
        break
      default:
        return
    }

    const nextValueArray = this._value.slice()
    nextValueArray[index] = nextValue

    this.value = nextValueArray
    await this.updateComplete
    this.dispatchInputEvent()
  }

  protected getNormalizedValue(value: number) {
    return (value - this.min) / (this.max - this.min)
  }

  protected getValueFromClientX(clientX: number) {
    const rect = this.trackRect ?? this.track.getBoundingClientRect()

    /**
     * If the track has no width, we cannot calculate a normalized value (dividing by zero).
     */
    if (rect.width === 0) {
      return this.valueAsArray[0]
    }

    /**
     * The first and the list tick of the range slider
     * are not at the very edge of the track, but are offset by the radius of the thumb.
     * This is to ensure that the thumb can be fully visible when at the min or max value.
     * This means we have to subtract the radius of the thumb from the width of the track when calculating the normalized value.
     * Pointer events that are outside of the track will be clamped to the min or max value.
     */
    const trimmedWidth = rect.width - THUMB_RADIUS * 2
    const xPosition = clientX - rect.left - THUMB_RADIUS

    const normalizedValue = clamp(xPosition / trimmedWidth, 0, 1)

    const rawValue = normalizedValue * (this.max - this.min) + this.min

    return this.clampAndRoundValue(rawValue)
  }

  protected getClosestThumbIndex(nextValue: number) {
    if (
      !this.multiple ||
      this._value.length < 2 ||
      typeof this._value[1] === "undefined"
    )
      return 0

    const distanceToFirst = Math.abs(this._value[0] - nextValue)
    const distanceToSecond = Math.abs(this._value[1] - nextValue)

    return distanceToFirst <= distanceToSecond ? 0 : 1
  }

  protected updateThumbValue(index: number, nextValue: number) {
    if (this._value[index] === undefined || this._value[index] === nextValue) {
      return
    }

    const nextValueArray = this._value.slice()
    nextValueArray[index] = nextValue

    this.value = nextValueArray
    this.dispatchInputEvent()
  }

  protected handleThumbPointerDown(e: PointerEvent, index: number) {
    if (this.disabled) {
      return
    }

    this.activeThumbIndex = index
  }

  protected handlePointerDown(e: PointerEvent) {
    if (this.disabled) {
      return
    }

    e.preventDefault()

    const track = e.currentTarget as HTMLDivElement
    const nextValue = this.getValueFromClientX(e.clientX)

    this.activePointerId = e.pointerId
    this.activeThumbIndex ??= this.getClosestThumbIndex(nextValue)

    track.setPointerCapture(e.pointerId)
    this.updateThumbValue(this.activeThumbIndex, nextValue)

    const thumb = this.renderRoot.querySelector<HTMLElement>(
      `.range__thumb[data-thumb-index="${this.activeThumbIndex}"]`,
    )
    thumb?.focus()
  }

  protected handlePointerMove(e: PointerEvent) {
    if (
      this.disabled ||
      this.activePointerId !== e.pointerId ||
      this.activeThumbIndex === null
    ) {
      return
    }

    e.preventDefault()

    const nextValue = this.getValueFromClientX(e.clientX)
    this.updateThumbValue(this.activeThumbIndex, nextValue)
  }

  protected resetActivePointerState() {
    this.activePointerId = null
    this.activeThumbIndex = null
  }

  protected handlePointerEnd(e: PointerEvent) {
    if (this.activePointerId !== e.pointerId) {
      return
    }

    const track = e.currentTarget as HTMLDivElement

    if (track.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId)
    }

    this.resetActivePointerState()
  }

  protected handleLostPointerCapture() {
    this.resetActivePointerState()
  }

  protected getNormalizedRange() {
    if (this.multiple) {
      return this.valueAsArray.map((value) => this.getNormalizedValue(value))
    }

    return [0, this.getNormalizedValue(this.valueAsArray[0])]
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

    return html`<div class="range__ticks">
      ${Array.from(
        { length: (this.max - this.min) / this.step + 1 },
        (_, i) => this.min + i * this.step,
      ).map(
        (tick) =>
          html`<span
            class="range__tick"
            style="left: ${this.getNormalizedValue(tick) * 100}%"
          ></span>`,
      )}
    </div>`
  }

  render() {
    const inputs = this.multiple ? ["low", "high"] : ["single"]

    const { multiple, disabled, label, _value, hideLabel } = this
    const normalizedRange = this.getNormalizedRange()

    return html`
      <div
        id="container"
        class="range"
        style="--low: ${normalizedRange[0]}; --high: ${normalizedRange[1]}"
      >
        ${hideLabel
          ? html`<leu-visually-hidden>
              <span id="label" class="range__label">${label}</span>
            </leu-visually-hidden>`
          : html`<span id="label" class="range__label">${label}</span>`}
        ${multiple
          ? html`
              <leu-visually-hidden>
                <span id="label-0"
                  >${_value[0] < _value[1]!
                    ? RANGE_LABELS[0]
                    : RANGE_LABELS[1]}</span
                >
                <span id="label-1"
                  >${_value[0] < _value[1]!
                    ? RANGE_LABELS[1]
                    : RANGE_LABELS[0]}</span
                >
              </leu-visually-hidden>
            `
          : nothing}
        <div class="range__outputs">
          ${inputs.map(
            (type, index) =>
              html`<output
                class="range__output"
                for="input-${type}"
                value=${this.formatValue(_value[index])}
                style="--value: ${this.getNormalizedValue(_value[index])}"
                >${this.formatValue(_value[index])}</output
              >`,
          )}
        </div>
        <div
          id="track"
          class="range__track"
          @pointerdown=${this.handlePointerDown}
          @pointermove=${this.handlePointerMove}
          @pointerup=${this.handlePointerEnd}
          @pointercancel=${this.handlePointerEnd}
          @lostpointercapture=${this.handleLostPointerCapture}
        >
          ${inputs.map(
            (type, index) => html`
              <div
                @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e, index)}
                @pointerdown=${(e: PointerEvent) =>
                  this.handleThumbPointerDown(e, index)}
                type="range"
                class="range__thumb range__thumb--${type}"
                data-thumb-index=${index}
                id="input-${type}"
                name=${this.name}
                role="slider"
                aria-valuemin=${this.min}
                aria-valuemax=${this.max}
                aria-valuenow=${_value[index]}
                aria-valuetext=${this.formatValue(_value[index])}
                step=${this.step}
                aria-labelledby="label  ${multiple ? `label-${index}` : ""}"
                aria-disabled=${disabled}
                style="--value: ${this.getNormalizedValue(_value[index])}"
                tabindex=${ifDefined(disabled ? undefined : 0)}
              ></div>
            `,
          )}
          ${this.renderTicks()}
        </div>
      </div>
      ${this.showRangeLabels
        ? html`<div class="range__tick-labels">
            <span class="range__tick-label range__tick-label--min"
              >${this.formatValue(this.min)}</span
            >
            <span class="range__tick-label range__tick-label--max"
              >${this.formatValue(this.max)}</span
            >
          </div>`
        : nothing}
    `
  }
}
