import { html, LitElement } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./slider.css"

/**
 * @tagname leu-slider
 */
export class LeuSlider extends LitElement {
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
       * The value.
       * @type {number}
       */
      value: { type: Number },

      /**
       * The label.
       * @type {string}
       */
      label: { type: String },
    }
  }

  constructor() {
    super()

    this.disabled = false
    this.min = 0
    this.max = 100
    this.value = 0
    this._actualMin = this.min
    this._actualMax = this.max
    this._input = {}
    this._slider = {}
    this._thumb = {}
  }

  async firstUpdated() {
    this._input = this.shadowRoot.querySelector("input")
    this._slider = this.shadowRoot.querySelector(".slider-track")
    this._thumb = this.shadowRoot.querySelector(".slider-thumb")
    this._actualMin = this.min
    this._actualMax = this.max

    if (this.step) {
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
  }

  updated(changedProps) {
    if (changedProps.has("value")) {
      this._updateSlider()
    }
  }

  handleInput(event) {
    this.checked = event.target.checked
  }

  render() {
    return html`
      <div class="label">${this.label}</div>
      <div class="slider-value-track">
        <div class="slider-value">${this.value}</div>
      </div>
      <div class="slider-container">
        <div class="slider-track"></div>
        <div class="slider-track-value"></div>
        <input
          type="range"
          max=${this.max}
          min=${this.min}
          step=${this.step}
          .value=${this.value}
          ?disabled=${this.disabled}
          @input=${this._changeHandler}
        /></input>
        <div class="slider-thumb"></div>
      </div>
    `
  }

  /**
   * Sets the slider value.
   */
  _changeHandler() {
    const { value } = this._input

    if (value > this._actualMax) {
      this.value = this._actualMax
    } else if (value < this._actualMin) {
      this.value = this._actualMin
    } else {
      this.value = value
    }
  }

  /**
   * Updates the slider's value width and thumb position (UI).
   * @event change
   */
  _updateSlider() {
    const min = this.min < this._actualMin ? this._actualMin : this.min
    const max = this.max > this._actualMax ? this._actualMax : this.max
    const percentage = (this.value - min) / (max - min)
    const thumbWidth = this._thumb.offsetWidth
    const sliderWidth = this._slider.offsetWidth
    const sliderValueWidth = `${percentage * 100}%`
    const thumbOffset = `${(sliderWidth - thumbWidth) * percentage}px`
    const valueOffset = `${
      (sliderWidth - thumbWidth) * percentage - (sliderWidth - thumbWidth) / 2
    }px`

    this.style.setProperty("--slider-track-value-width", sliderValueWidth)
    this.style.setProperty("--slider-thumb-offset", thumbOffset)
    this.style.setProperty("--slider-value-offset", valueOffset)

    // Dispatch the change event for range-slider. (For event handlers.)
    this.dispatchEvent(new Event("change"))
  }
}

export function defineSliderElements() {
  defineElement("slider", LeuSlider)
}
