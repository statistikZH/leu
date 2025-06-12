/**
 * Thanks Shoelace!
 * Source: https://github.com/shoelace-style/shoelace/blob/next/src/internal/slot.ts
 */

import { ReactiveController, ReactiveControllerHost } from "lit"

/**
 * A reactive controller that determines when slots exist.
 */
export class HasSlotController implements ReactiveController {
  host: ReactiveControllerHost & Element

  slotNames: string[]

  constructor(host: ReactiveControllerHost & Element, slotNames: string[]) {
    this.host = host
    host.addController(this)

    this.slotNames = slotNames
  }

  private hasDefaultSlot() {
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

  private hasNamedSlot(name: string) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null
  }

  test(slotName: string) {
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
      this.handleSlotChange,
    )
  }

  private handleSlotChange = (event: Event) => {
    const slot = event.target

    if (
      slot instanceof HTMLSlotElement &&
      ((this.slotNames.includes("[default]") && !slot.name) ||
        (slot.name && this.slotNames.includes(slot.name)))
    ) {
      this.host.requestUpdate()
    }
  }
}
