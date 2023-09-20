import { html, css, LitElement } from "lit"
import { classMap } from "lit/directives/class-map.js"

export class LeuRadioGroup extends LitElement {
  static styles = css`
    :host {
      --group-font-regular: var(--leu-font-regular);
      --group-font-black: var(--leu-font-black);

      font-family: var(--group-font-regular);
    }

    .fieldset {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      gap: 0.5rem 1rem;

      border: none;
      padding: 0;
    }

    .fieldset--vertical {
      flex-direction: column;
      gap: 1rem;
    }

    .legend {
      font-family: var(--group-font-black);
      font-size: 1.125rem;
      line-height: 1.5;

      margin-bottom: 0.5rem;
    }
  `

  static properties = {
    orientation: { type: String },
  }

  constructor() {
    super()
    this.orientation = "HORIZONTAL"
    this._currentIndex = 0
    this.items = []
  }

  get value() {
    const checkedValues = this.items
      .filter((i) => i.checked)
      .map((i) => i.value)
    return checkedValues.length > 0 ? checkedValues[0] : ""
  }

  connectedCallback() {
    super.connectedCallback()
    this.handleItems()
    this.addEventListeners()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListeners()
  }

  addEventListeners() {
    this.addEventListener("input", this.handleInput)
    this.addEventListener("focusin", this.handleFocusIn)
    this.addEventListener("keydown", this.handleKeyDown)
  }

  removeEventListeners() {
    this.removeEventListener("input", this.handleInput)
    this.removeEventListener("focusin", this.handleFocusIn)
    this.removeEventListener("keydown", this.handleKeyDown)
  }

  handleSlotChange() {
    this.handleItems()
  }

  handleFocusIn = (e) => {
    this._currentIndex = this.items.indexOf(e.target)
  }

  handleKeyDown = (e) => {
    const currentIndex = this.items.indexOf(e.target)

    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        this.selectNextItem(currentIndex, -1)
        break
      case "ArrowDown":
      case "ArrowRight":
        this.selectNextItem(currentIndex, 1)
        break
      case "Home":
        this.selectItem(this.items.find((item) => !item.disabled))
        break
      case "End":
        this.selectItem(this.items.findLast((item) => !item.disabled))
        break
      default:
    }

    this.setTabIndex()
  }

  handleInput = (e) => {
    if (e.target.checked) {
      this.items
        .filter((item) => item !== e.target)
        .forEach((item) => {
          item.checked = false // eslint-disable-line no-param-reassign
        })
    }
  }

  selectItem(selectingItem) {
    this.items.forEach((item) => {
      item.checked = item === selectingItem // eslint-disable-line no-param-reassign
    })
  }

  selectNextItem(startingIndex, direction) {
    let selected = false

    for (let index = 0; index < this.items.length; index += 1) {
      const currentIndex =
        (this.items.length + index * direction + startingIndex + direction) %
        this.items.length
      const currentItem = this.items[currentIndex]

      if (!selected && !currentItem.disabled) {
        currentItem.checked = true
        currentItem.focus()
        selected = true
      } else if (selected) {
        currentItem.checked = false
      }
    }
  }

  setTabIndex() {
    this.items.forEach((item, index) => {
      if (index === this._currentIndex) {
        item.tabIndex = "0" // eslint-disable-line no-param-reassign
      } else {
        item.tabIndex = "-1" // eslint-disable-line no-param-reassign
      }
    })
  }

  handleItems() {
    this.items = [...this.querySelectorAll(":scope > *:not([slot])")]
    this.initializeIndex()
    this.setTabIndex()
  }

  initializeIndex() {
    const index = this.items.findIndex(
      (item) => item.hasAttribute("checked") && !item.hasAttribute("disabled")
    )
    const nextEnabledIndex = this.items.findIndex(
      (item) => !item.hasAttribute("disabled")
    )

    this._currentIndex = index >= 0 ? index : nextEnabledIndex
  }

  render() {
    const fieldsetClasses = {
      fieldset: "true",
      "fieldset--vertical": this.orientation === "VERTICAL",
    }

    return html`
      <fieldset class=${classMap(fieldsetClasses)}>
        <legend class="legend"><slot name="legend"></slot></legend>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>
    `
  }
}
