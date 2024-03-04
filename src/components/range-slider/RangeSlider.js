import { html, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./range-slider.css"

/**
 * @tagname leu-range-slider
 */
export class LeuRangeSlider extends LitElement {
  static styles = styles

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

  static get properties() {
    return {
      /**
       * Flag whether the slider is disabled or not.
       * @type {boolean}
       */
      disabled: {
        reflect: true,
        type: Boolean,
      },

      /**
       * The minimum value.
       * @type {number}
       */
      min: { type: Number },

      /**
       * The maximum value.
       * @type {number}
       */
      max: { type: Number },

      /**
       * The interval of the value.
       * @type {number}
       */
      step: { type: Number },

      /**
       * The from value.
       * @type {number}
       */
      fromValue: { type: Number },

      /**
       * The to value.
       * @type {number}
       */
      toValue: { type: Number },

      /**
       * The label.
       * @type {string}
       */
      label: { type: String },

      /**
       * An Array of values to be displayed
       * @type {Array}
       */
      labelsArray: { type: Array },

      /**
       * An Array of values to be displayed
       * @type {Array}
       */
      labelsFormat: { type: Object },

      /**
       * The current from value label
       * @type {String}
       */
      displayFromValue: { type: String, reflect: true },

      /**
       * The current to value label
       * @type {String}
       */
      displayToValue: { type: String, reflect: true },
    }
  }

  static formatNumber(specificvalue, formatter = { locale: "de-CH" }) {
    if (formatter.options.style === "date") {
      if (formatter.options.unit === "month") {
        return new Intl.DateTimeFormat(formatter.locale, {
          month: "long",
          year: "numeric",
        }).format(specificvalue)
      }
      return new Intl.DateTimeFormat(formatter.locale).format(specificvalue)
    }
    return new Intl.NumberFormat(formatter.locale, formatter.options).format(
      specificvalue
    )
  }

  constructor() {
    super()

    this.disabled = false
    this.min = 0
    this.max = 100
    this.fromValue = this.min
    this.toValue = this.max
    this.labelsArray = []
    this.labelsFormat = {}
    this.displayFromValue = this.fromValue
    this.displayToValue = this.toValue
    this._actualMin = this.min
    this._actualMax = this.max
    this._fromInput = {}
    this._toInput = {}
    this._slider = {}
    this._thumb = {}
    this._valueFromTooltip = {}
    this._valueToTooltip = {}

    // update the slider value track on resize
    window.addEventListener("resize", () => {
      this._updateSlider("fromValue")
    })
  }

  async firstUpdated() {
    this._fromInput = this.shadowRoot.querySelector("input#from-slider")
    this._toInput = this.shadowRoot.querySelector("input#to-slider")
    this._slider = this.shadowRoot.querySelector(".slider-track")
    this._fromThumb = this.shadowRoot.querySelector(".slider-from-thumb")
    this._toThumb = this.shadowRoot.querySelector(".slider-to-thumb")
    this._valueFromTooltip = this.shadowRoot.querySelector(".slider-from-value")
    this._valueToTooltip = this.shadowRoot.querySelector(".slider-to-value")
    this._actualMin = this.min
    this._actualMax = this.max
    this.displayFromValue = this.fromValue
    this.displayToValue = this.toValue

    if (this.step && this.labelsFormat.options.style !== "date") {
      const minRemainder = this.min % this.step
      const maxRemainder = this.max % this.step

      // The behavior of HTML input[type=range] does not allow the slider to be
      // moved to the min/max values if those properties are not multiples of the
      // step property.
      // To be able to move the slider to the min/max values:
      // Set the min to the closest multiple of step lower than the min value provided.
      if (minRemainder !== 0) {
        this.min -= minRemainder
      }

      // Set the max to the closest multiple of step higher than the max value provided.
      if (maxRemainder !== 0) {
        this.max = this.max + this.step - maxRemainder
      }
    }

    if (this.labelsFormat) {
      this.displayFromValue = LeuRangeSlider.formatNumber(
        this.fromValue,
        this.labelsFormat
      )
      this.displayToValue = LeuRangeSlider.formatNumber(
        this.toValue,
        this.labelsFormat
      )
    }

    // if the value labels are provided in an array
    if (this.labelsArray) {
      this.min = 0
      this.max = this.labelsArray.length - 1
      this.step = 1
      if (this.fromValue === undefined) {
        this.fromValue = this.min
      }
      if (this.toValue === undefined) {
        this.toValue = this.max
      }
      this.displayFromValue = this.labelsArray[this.fromValue]
      this.displayToValue = this.labelsArray[this.toValue]
    }
  }

  updated(changedProps) {
    if (changedProps.has("fromValue")) {
      this._updateSlider("fromValue")
    }
    if (changedProps.has("toValue")) {
      this._updateSlider("toValue")
    }
  }

  render() {
    return html`
      <div class="label">${this.label}</div>
      <div class="slider-from-value-track">
        <div class="slider-from-value">${this.displayFromValue}</div>
      </div>
      <div class="slider-to-value-track">
        <div class="slider-to-value">${this.displayToValue}</div>
      </div>
      <div class="slider-container">
        <div class="slider-track"></div>
        <div class="slider-track-value"></div>
        <input
          id="from-slider"
          type="range"
          max=${this.max}
          min=${this.min}
          step=${this.step}
          .value=${this.fromValue}
          ?disabled=${this.disabled}
          @input=${this._changeFromHandler}
        />
        <input
          id="to-slider"
          type="range"
          max=${this.max}
          min=${this.min}
          step=${this.step}
          .value=${this.toValue}
          ?disabled=${this.disabled}
          @input=${this._changeToHandler}
        />
        <div id="from-slider-thumb" class="slider-from-thumb"></div>
        <div id="to-slider-thumb" class="slider-to-thumb"></div>
      </div>
    `
  }

  /**
   * Sets the from slider value.
   */
  _changeFromHandler() {
    const value = Number(this._fromInput.value)

    if (value > this._actualMax) {
      this.fromValue = this._actualMax
    } else if (value < this._actualMin) {
      this.fromValue = this._actualMin
    }
    // keep fromValue from going above toValue
    else if (value > this.toValue) {
      this.fromValue = this.toValue
      this._fromInput.value = this.toValue
    } else {
      this.fromValue = value
    }

    this.displayFromValue = this.fromValue
    if (this.labelsFormat) {
      this.displayFromValue = LeuRangeSlider.formatNumber(
        this.fromValue,
        this.labelsFormat
      )
    }
    if (this.labelsArray) {
      this.displayFromValue = this.labelsArray[this.fromValue]
    }
  }

  /**
   * Sets the to slider value.
   */
  _changeToHandler() {
    const value = Number(this._toInput.value)

    if (value > this._actualMax) {
      this.toValue = this._actualMax
    } else if (value < this._actualMin) {
      this.toValue = this._actualMin
    }
    // keep toValue from going below fromValue
    else if (value < this.fromValue) {
      this.toValue = this.fromValue
      this._toInput.value = this.fromValue
    } else {
      this.toValue = value
    }

    this.displayToValue = this.toValue
    if (this.labelsFormat) {
      this.displayToValue = LeuRangeSlider.formatNumber(
        this.toValue,
        this.labelsFormat
      )
    }
    if (this.labelsArray) {
      this.displayToValue = this.labelsArray[this.toValue]
    }
  }

  /**
   * Updates the to slider's value width and thumb position (UI).
   * @event change
   */
  _updateSlider(lastChange) {
    const min = this.min < this._actualMin ? this._actualMin : this.min
    const max = this.max > this._actualMax ? this._actualMax : this.max
    const fromPercentage = (this.fromValue - min) / (max - min)
    const toPercentage = (this.toValue - min) / (max - min)
    const thumbWidth = this._toThumb.offsetWidth
    const sliderWidth = this._slider.offsetWidth
    const valueFromTooltipWidth = this._valueFromTooltip.offsetWidth
    const valueToTooltipWidth = this._valueToTooltip.offsetWidth
    const maxFromValueOffset = (sliderWidth - valueFromTooltipWidth) / 2
    const maxToValueOffset = (sliderWidth - valueToTooltipWidth) / 2

    const sliderValueWidth = `${(toPercentage - fromPercentage) * 100}%`
    const sliderValueFrom = `${fromPercentage * 100}%`
    const sliderValueWidthPx = sliderWidth * (toPercentage - fromPercentage)
    const fromThumbOffset = `${(sliderWidth - thumbWidth) * fromPercentage}px`
    const toThumbOffset = `${(sliderWidth - thumbWidth) * toPercentage}px`

    // calculate default offset for both tooltips
    let calcFromValueOffset =
      (sliderWidth - thumbWidth) * fromPercentage -
      (sliderWidth - thumbWidth) / 2
    let calcToValueOffset =
      (sliderWidth - thumbWidth) * toPercentage - (sliderWidth - thumbWidth) / 2

    // move the tooltips if they overlap
    if (
      sliderValueWidthPx <
      (valueFromTooltipWidth + valueToTooltipWidth) / 2 + 5
    ) {
      const overlap =
        (valueFromTooltipWidth + valueToTooltipWidth) / 2 - sliderValueWidthPx
      calcFromValueOffset = calcFromValueOffset - overlap / 2 - 2.5
      calcToValueOffset = calcToValueOffset + overlap / 2 + 2.5
    }

    // move the tooltips right if the left border is reached
    if (
      calcToValueOffset <
      -1 * (maxToValueOffset - valueFromTooltipWidth - 5)
    ) {
      calcToValueOffset = -1 * (maxToValueOffset - valueFromTooltipWidth - 5)
    }
    if (calcFromValueOffset < -1 * maxFromValueOffset) {
      calcFromValueOffset = -1 * maxFromValueOffset
    }

    // move the tooltips left if the right border is reached
    if (calcFromValueOffset > maxToValueOffset - valueToTooltipWidth - 5) {
      calcFromValueOffset = maxToValueOffset - valueToTooltipWidth - 5
    }
    if (calcToValueOffset > maxToValueOffset) {
      calcToValueOffset = maxToValueOffset
    }

    const fromValueOffset = `${calcFromValueOffset}px`
    const toValueOffset = `${calcToValueOffset}px`

    this.style.setProperty("--slider-track-value-width", sliderValueWidth)
    this.style.setProperty("--slider-track-value-min", sliderValueFrom)
    this.style.setProperty("--slider-to-thumb-offset", toThumbOffset)
    this.style.setProperty("--slider-from-thumb-offset", fromThumbOffset)
    this.style.setProperty("--slider-to-value-offset", toValueOffset)

    this.style.setProperty("--slider-from-value-offset", fromValueOffset)
    // the keep last slider that moved in the foreground (important on min- and max-values)
    this.style.setProperty(
      "--slider-from-z-index",
      lastChange === "fromValue" ? 1 : 0
    )
    this.style.setProperty(
      "--slider-to-z-index",
      lastChange === "toValue" ? 1 : 0
    )

    // Dispatch the change event for range-slider. (For event handlers.)
    this.dispatchEvent(new Event("change"))
  }
}

export function defineRangeSliderElements() {
  defineElement("range-slider", LeuRangeSlider)
}
