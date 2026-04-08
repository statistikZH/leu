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

/**
 * Tab Group
 *
 * @slot tabs - Slot for the leu-tab elements
 * @slot panels - Slot for the leu-tab-panel elements
 * @fires leu:show-tab-panel - Fired when a tab is shown, with the name of the active panel in the event detail
 * @todo: add disabled state to tabs and panels
 * @todo: add backdrop / shadow
 * @todo: add styling option for full-bleed layout (tabslist is full-bleed, panels use the full width of the container)
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

  /**
   * Name of the active/selected tab and panel. Has to match the name property of a leu-tab and leu-tab-panel.
   */
  @property({ type: String, reflect: true })
  active = ""

  @state()
  protected isScrollable: ScrollableState = { left: false, right: false }

  @state()
  protected tabs: LeuTab[] = []

  @state()
  protected panels: LeuTabPanel[] = []

  protected initialShowEventDispatched = false

  protected tabMenuRef = createRef<HTMLDivElement>()

  protected resizeObserver = new ResizeObserver(() => {
    this.checkScrollable()
  })

  // Observe changes to the id attribute of tabs and panels
  // to update the aria attributes accordingly
  protected mutationObserver = new MutationObserver((records) => {
    for (const record of records) {
      if (!(record.target instanceof HTMLElement)) {
        continue
      }

      if (
        record.type === "attributes" &&
        record.attributeName === "id" &&
        record.target.matches("leu-tab, leu-tab-panel")
      ) {
        this.linkTabsAndPanels()
        continue
      }
    }
  })

  connectedCallback() {
    super.connectedCallback()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.resizeObserver.disconnect()
    this.mutationObserver.disconnect()
  }

  firstUpdated() {
    if (this.tabMenuRef.value) {
      this.resizeObserver.observe(this.tabMenuRef.value)
    }

    this.mutationObserver.observe(this, {
      subtree: true,
      attributes: true,
      attributeFilter: ["id"],
    })
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

    // Dispatch the show event when the active tab changes.
    // The initial dispatch is handled in handleTabsSlotChange to ensure `active`is set to a valid value
    if (changedProperties.has("active") && this.initialShowEventDispatched) {
      this.dispatchShowEvent()
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
      console.log(
        `Active tab "${this.active}" not found in the new set of tabs. Resetting active tab to "${this.tabs[0].name}".`,
      )
      this.active = this.tabs[0].name
    }
    this.linkTabsAndPanels()

    await this.updateComplete
    this.checkScrollable()

    // Dispatch the initial show event to avoid multiple dispatches when the active tab is reset and panels are updated
    if (!this.initialShowEventDispatched) {
      this.dispatchShowEvent()
    }
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

  protected dispatchShowEvent() {
    this.dispatchEvent(
      new CustomEvent("leu:show-tab-panel", {
        detail: { name: this.active },
        bubbles: true,
        composed: true,
      }),
    )
    this.initialShowEventDispatched = true
  }

  protected async keydownHandler(event: KeyboardEvent) {
    const activeTab = this.activeTab
    let nextTab: LeuTab | null = null

    if (
      !["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key) ||
      !activeTab
    ) {
      return
    }

    switch (event.key) {
      case "ArrowRight":
      case "ArrowLeft": {
        const direction = event.key === "ArrowRight" ? 1 : -1
        const currentIndex = this.tabs.indexOf(activeTab)
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
    nextTab.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    })
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
