/**
 * Thanks Shoelace!
 * Source: https://github.com/shoelace-style/shoelace/blob/next/src/internal/slot.ts
 */

/**
 * A reactive controller that determines when slots exist.
 * @implements { import("lit").ReactiveController }
 */
export class HasSlotController {
  constructor(host, slotNames) {
    this.host = host
    host.addController(this)

    this.slotNames = slotNames
  }

  /**
   * @private
   * @returns {Boolean}
   */
  hasDefaultSlot() {
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
        return true
      }

      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node

        // If it doesn't have a slot attribute, it's part of the default slot
        if (!el.hasAttribute("slot")) {
          return true
        }
      }

      return false
    })
  }

  /**
   * @private
   * @param {String} name
   * @returns {Boolean}
   */
  hasNamedSlot(name) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null
  }

  /**
   * @param {String} slotName
   * @returns {Boolean}
   */
  test(slotName) {
    return slotName === "[default]"
      ? this.hasDefaultSlot()
      : this.hasNamedSlot(slotName)
  }

  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange)
  }

  hostDisconnected() {
    this.host.shadowRoot.removeEventListener(
      "slotchange",
      this.handleSlotChange
    )
  }

  /**
   * @private
   * @param {Event} event
   */
  handleSlotChange = (event) => {
    const slot = event.target

    if (
      (this.slotNames.includes("[default]") && !slot.name) ||
      (slot.name && this.slotNames.includes(slot.name))
    ) {
      this.host.requestUpdate()
    }
  }
}
