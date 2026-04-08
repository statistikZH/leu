import { html, PropertyValues } from "lit"
import { property, state } from "lit/decorators.js"
import { classMap } from "lit/directives/class-map.js"
import { createRef, ref } from "lit/directives/ref.js"

import { LeuElement } from "../../lib/LeuElement.js"
import { LeuTab } from "./Tab.js"
import { LeuTabPanel } from "./TabPanel.js"

import styles from "./tab-group.css?inline"

type ScrollableState = {
  left: boolean
  right: boolean
}

let nextId = 0

/**
 * Tab Group
 *
 * @slot tabs - Slot for the leu-tab elements
 * @slot panels - Slot for the leu-tab-panel elements
 * @fires leu:show-tab-panel - Fired when a tab is shown, with the name of the active panel in the event detail
 *
 * @tagname leu-tab-group
 */
export class LeuTabGroup extends LeuElement {
  static styles = [LeuElement.styles, styles]

  /**
   * Label for the tab list, used for accessibility.
   * Content will not be visible on the page, but should be provided for screen readers.
   */
  @property({ type: String })
  label = ""

  @property({ type: String, reflect: true })
  active = ""

  @state()
  protected isScrollable: ScrollableState = { left: false, right: false }

  @state()
  protected tabs: LeuTab[] = []

  @state()
  protected panels: LeuTabPanel[] = []

  protected tabMenuRef = createRef<HTMLDivElement>()

  protected resizeObserver = new ResizeObserver(() => {
    this.checkScrollable()
  })

  connectedCallback() {
    super.connectedCallback()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.resizeObserver.disconnect()
  }

  firstUpdated() {
    if (this.tabMenuRef.value) {
      this.resizeObserver.observe(this.tabMenuRef.value)
    }
  }

  updated(changedProperties: PropertyValues) {
    if (
      changedProperties.has("active") ||
      changedProperties.has("tabs") ||
      changedProperties.has("panels")
    ) {
      this.updatePanels()
      this.updateTabs()
    }

    if (changedProperties.has("active")) {
      this.dispatchEvent(
        new CustomEvent("leu:show-tab-panel", {
          detail: { name: this.active },
          bubbles: true,
          composed: true,
        }),
      )
    }
  }

  protected async handleTabsSlotChange() {
    const slot =
      this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="tabs"]')

    this.tabs =
      slot
        ?.assignedElements({ flatten: true })
        .filter((el) => el instanceof LeuTab) ?? []

    // if the active tab is not in the new set of tabs, activate the first tab
    if (
      this.tabs.length > 0 &&
      !this.tabs.some((tab) => tab.name === this.active)
    ) {
      this.active = this.tabs[0].name
    }
    this.linkTabsAndPanels()

    await this.updateComplete
    this.checkScrollable()
  }

  protected handlePanelsSlotChange() {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>(
      'slot[name="panels"]',
    )

    this.panels =
      slot
        ?.assignedElements({ flatten: true })
        .filter((el) => el instanceof LeuTabPanel) ?? []

    this.linkTabsAndPanels()
  }

  /**
   * Link tabs and panels by setting the appropriate aria attributes.
   * Generates global ids for tabs and panels if they don't have one.
   */
  protected linkTabsAndPanels() {
    for (const tab of this.tabs) {
      const panel = this.panels.find((o) => o.name === tab.name)

      if (!panel) continue

      if (tab.id === "" || panel.id === "") {
        const idCounter = nextId++
        tab.id = `leu-tab-${idCounter}`
        panel.id = `leu-tab-panel-${idCounter}`
      }

      tab.setAttribute("aria-controls", panel.id)
      panel.setAttribute("aria-labelledby", tab.id)
    }
  }

  protected get activeTab() {
    return this.tabs.find((o) => o.active)
  }

  protected get activePanel() {
    return this.panels.find((o) => o.name === this.activeTab?.name)
  }

  protected updatePanels() {
    for (const panel of this.panels) {
      panel.active = panel.name === this.active
    }
  }

  protected updateTabs() {
    for (const tab of this.tabs) {
      tab.active = tab.name === this.active
    }
  }

  protected async keydownHandler(event: KeyboardEvent) {
    // change focus with arrows only if one of the tab has focus
    const currentTab = event.target
    let nextTab: LeuTab | null = null

    if (
      !(currentTab instanceof LeuTab) ||
      !["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)
    ) {
      return
    }

    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft": {
        const direction = event.key === "ArrowRight" ? 1 : -1
        const currentIndex = this.tabs.indexOf(currentTab)
        const numOfTabs = this.tabs.length
        // cycle through the tabs
        const nextIndex = (currentIndex + direction + numOfTabs) % numOfTabs
        nextTab = this.tabs[nextIndex]
        break
      }

      case "Home":
        nextTab = this.tabs[0]
        break
      case "End":
        nextTab = this.tabs[this.tabs.length - 1]
        break
      default:
        return
    }

    this.active = nextTab.name
    await this.updateComplete
    nextTab.focus()
  }

  protected checkScrollable() {
    const tabMenu = this.tabMenuRef.value
    if (!tabMenu) return

    this.isScrollable = {
      left: tabMenu.scrollLeft > 0,
      right: tabMenu.scrollLeft < tabMenu.scrollWidth - tabMenu.clientWidth,
    }
  }

  protected handleScrollEvent() {
    this.checkScrollable()
  }

  protected handleTabSelect(event: CustomEvent) {
    this.active = event.detail.name
  }

  render() {
    const containerClasses = {
      container: true,
      "container--scrollable-left": this.isScrollable.left,
      "container--scrollable-right": this.isScrollable.right,
    }

    return html`
      <div class=${classMap(containerClasses)}>
        <div
          class="tab-menu"
          role="tablist"
          @keydown=${this.keydownHandler}
          @leu:tab-select=${this.handleTabSelect}
          @scroll="${this.handleScrollEvent}"
          aria-label=${this.label}
          ${ref(this.tabMenuRef)}
        >
          <slot name="tabs" @slotchange=${this.handleTabsSlotChange}></slot>
        </div>
      </div>
      <slot name="panels" @slotchange=${this.handlePanelsSlotChange}></slot>
    `
  }
}
