import { html } from "lit"
import { property, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { createRef, ref } from "lit/directives/ref.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuTabButton } from "./TabButton.js"
import { LeuTabPanel } from "./TabPanel.js"

import styles from "./tab.css?inline"

/**
 * Tab
 *
 * behavior: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 *
 * design: https://www.zh.ch/de/webangebote-entwickeln-und-gestalten/inhalt/designsystem/komponenten/reiter.zhweb-noredirect.zhweb-cache.html?node-id=21161%3A184423&node-id=21161%3A184423&node-id=21161%3A184423&search=tab
 *
 * see also servicebox: https://www.zh.ch/de/webangebote-entwickeln-und-gestalten/inhalt/designsystem/muster/servicebox.zhweb-noredirect.zhweb-cache.html?node-id=18473%3A158885
 *
 * @slot tabs - Place the LeuTabButton[]
 * @slot panels - Place the LeuTabPanel[]
 *
 * @tagname leu-tab
 */
export class LeuTab extends LeuElement {
  static styles = [LeuElement.styles, styles]

  @property({ type: String, reflect: true })
  active = ""

  @state()
  private shadowLeft = false

  @state()
  private shadowRight = false

  @state()
  private scrollRef = createRef()

  @state()
  private buttons: LeuTabButton[] = []

  @state()
  private panels: LeuTabPanel[] = []

  private async handleButtonSlotChange() {
    this.buttons = Array.from(
      this.querySelectorAll(':scope > *[slot="tabs"]:not([disabled])'),
    ).filter((el) => el instanceof LeuTabButton)

    await this.updateComplete

    this.updatePanel()
    this.shadowToggle(this.scrollRef.value)
  }

  private handlePanelSlotChange() {
    this.panels = Array.from(
      this.querySelectorAll(':scope > *[slot="panel"]'),
    ).filter((el) => el instanceof LeuTabPanel)

    this.updatePanel()
  }

  get activeButton() {
    return this.buttons.find((o) => o.active)
  }

  get activePanel() {
    return this.panels.find((o) => o.name === this.activeButton.name)
  }

  private get lastButton() {
    return this.buttons[this.buttons.length - 1]
  }

  private get firstButton() {
    return this.buttons[0]
  }

  private updatePanel() {
    for (const panel of this.panels) {
      panel.style.display = "none"
    }
    if (this.activePanel) {
      this.activePanel.style.display = "block"
    }
  }

  private updateTabs() {
    console.log("updateTabs", this.buttons, this.active)
    for (const button of this.buttons) {
      button.active = button.name === this.active
    }
  }

  private keydownHandler(event) {
    // change focus with arrows only if one of the buttons has focus
    const focusButton = this.buttons.find((o) => o.matches(":focus"))
    if (focusButton !== undefined) {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        // rotate index with arrows
        const shift = event.key === "ArrowRight" ? 1 : -1
        const oldIndex = this.buttons.indexOf(focusButton)
        const nextIndex =
          (oldIndex + (oldIndex < 2 ? this.buttons.length : 0) + shift) %
          this.buttons.length
        const nextButton = this.buttons[nextIndex]
        // update buttons
        this.activeTab = nextButton.name
      }
      if (event.key === "Home") {
        this.activeTab = this.firstButton.name
      }
      if (event.key === "End") {
        this.activeTab = this.lastButton.name
      }
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener("keydown", this.keydownHandler)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener("keydown", this.keydownHandler)
  }

  updated() {
    this.updatePanel()
    this.updateTabs()
  }

  private shadowToggle(target) {
    this.shadowLeft = target.scrollLeftMax > 0 && target.scrollLeft > 0
    this.shadowRight =
      target.scrollLeftMax > 0 && target.scrollLeft < target.scrollLeftMax
  }

  private handleScrollEvent(event) {
    this.shadowToggle(event.target)
  }

  private handleTabSelect(event: CustomEvent) {
    console.log("handleTabSelect", event.detail.name)
    this.active = event.detail.name
    this.updatePanel()
    this.updateTabs()
  }

  render() {
    const shadowClassesLeft = {
      shadow: true,
      "shadow--left": this.shadowLeft,
    }

    const shadowClassesRight = {
      shadow: true,
      "shadow--right": this.shadowRight,
    }

    // TODO: @keyup=""
    return html`
      <div class="container">
        <div
          class="tab-menu"
          role="tablist"
          tabindex="-1"
          @leu:tab-select=${this.handleTabSelect}
          @scroll="${this.handleScrollEvent}"
          ref=${ref(this.scrollRef)}
        >
          <slot name="tabs" @slotchange=${this.handleButtonSlotChange}></slot>
        </div>
        <div class=${classMap(shadowClassesLeft)}></div>
        <div class=${classMap(shadowClassesRight)}></div>
      </div>
      <slot name="panels" @slotchange=${this.handlePanelSlotChange}></slot>
    `
  }
}
