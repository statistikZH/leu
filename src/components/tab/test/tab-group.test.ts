import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect, oneEvent } from "@open-wc/testing"
import { sendKeys } from "@web/test-runner-commands"
import { spy } from "sinon"

import "../leu-tab-group.js"
import "../leu-tab.js"
import "../leu-tab-panel.js"
import type { LeuTabGroup } from "../TabGroup.js"
import type { LeuTab } from "../Tab.js"
import type { LeuTabPanel } from "../TabPanel.js"

type TestArgs = {
  active?: string
  label?: string
}

async function defaultFixture(args: TestArgs = {}) {
  return fixture<LeuTabGroup>(html`
    <leu-tab-group
      active=${ifDefined(args.active)}
      label=${ifDefined(args.label)}
    >
      <leu-tab slot="tabs" name="online">Online</leu-tab>
      <leu-tab-panel slot="panels" name="online"><p>Online</p></leu-tab-panel>

      <leu-tab slot="tabs" name="vor-ort">Vor Ort</leu-tab>
      <leu-tab-panel slot="panels" name="vor-ort"><p>Vor Ort</p></leu-tab-panel>

      <leu-tab slot="tabs" name="per-post">Per Post</leu-tab>
      <leu-tab-panel slot="panels" name="per-post">
        <p>Per Post</p>
      </leu-tab-panel>
    </leu-tab-group>
  `)
}

function getTabs(el: LeuTabGroup): LeuTab[] {
  return Array.from(el.querySelectorAll<LeuTab>("leu-tab"))
}

function getPanels(el: LeuTabGroup): LeuTabPanel[] {
  return Array.from(el.querySelectorAll<LeuTabPanel>("leu-tab-panel"))
}

// ─── Element registration ─────────────────────────────────────────────────────

describe("LeuTabGroup – element registration", () => {
  it("leu-tab-group is a defined element", () => {
    expect(customElements.get("leu-tab-group")).not.to.be.undefined
  })
})

// ─── Accessibility ────────────────────────────────────────────────────────────

describe("LeuTabGroup – a11y", () => {
  it("passes the a11y audit", async () => {
    const el = await defaultFixture({ label: "Navigation" })
    await expect(el).shadowDom.to.be.accessible()
  })

  it("sets aria-label on the tablist from the label attribute", async () => {
    const el = await defaultFixture({ label: "Kanal wählen" })
    const tablist = el.shadowRoot!.querySelector("[role='tablist']")
    expect(tablist!.getAttribute("aria-label")).to.equal("Kanal wählen")
  })
})

// ─── Active fallback ─────────────────────────────────────────────────────────

describe("LeuTabGroup – active fallback", () => {
  it("activates the first tab when no active prop is set", async () => {
    const el = await defaultFixture()
    expect(el.active).to.equal("online")
  })

  it("activates the first tab when the active prop doesn't match any tab", async () => {
    const el = await defaultFixture({ active: "nonexistent" })
    expect(el.active).to.equal("online")
  })

  it("preserves a valid pre-set active value", async () => {
    const el = await defaultFixture({ active: "vor-ort" })
    expect(el.active).to.equal("vor-ort")
  })

  it("the active tab and panel are in sync", async () => {
    const el = await defaultFixture()
    const panels = getPanels(el)
    const activePanel = panels.find((p) => p.active)
    expect(activePanel?.getAttribute("name") ?? activePanel?.name).to.equal(
      el.active,
    )
  })
})

// ─── Tab/panel state ──────────────────────────────────────────────────────────

describe("LeuTabGroup – tab and panel state", () => {
  it("only one tab is active at a time", async () => {
    const el = await defaultFixture()
    const activeTabs = getTabs(el).filter((t) => t.active)
    expect(activeTabs).to.have.length(1)
  })

  it("only one panel is active at a time", async () => {
    const el = await defaultFixture()
    const activePanels = getPanels(el).filter((p) => p.active)
    expect(activePanels).to.have.length(1)
  })

  it("inactive tabs have ariaSelected=false", async () => {
    const el = await defaultFixture()
    const inactiveTabs = getTabs(el).filter((t) => !t.active)
    for (const tab of inactiveTabs) {
      expect(tab.ariaSelected).to.equal("false")
    }
  })

  it("the active tab has ariaSelected=true", async () => {
    const el = await defaultFixture()
    const activeTab = getTabs(el).find((t) => t.active)!
    expect(activeTab.ariaSelected).to.equal("true")
  })
})

// ─── Linking tabs and panels ──────────────────────────────────────────────────

describe("LeuTabGroup – aria linking", () => {
  it("each tab's aria-controls points to its panel's id", async () => {
    const el = await defaultFixture()
    const tabs = getTabs(el)
    const panels = getPanels(el)

    for (const tab of tabs) {
      const panel = panels.find((p) => p.name === tab.name)!
      expect(tab.getAttribute("aria-controls")).to.equal(panel.id)
    }
  })

  it("each panel's aria-labelledby points to its tab's id", async () => {
    const el = await defaultFixture()
    const tabs = getTabs(el)
    const panels = getPanels(el)

    for (const panel of panels) {
      const tab = tabs.find((t) => t.name === panel.name)!
      expect(panel.getAttribute("aria-labelledby")).to.equal(tab.id)
    }
  })

  it("uses custom ids provided by the user for aria linking", async () => {
    const el = await fixture<LeuTabGroup>(html`
      <leu-tab-group>
        <leu-tab id="tab-custom" slot="tabs" name="a">A</leu-tab>
        <leu-tab-panel id="panel-custom" slot="panels" name="a"
          >A</leu-tab-panel
        >
      </leu-tab-group>
    `)
    const tab = el.querySelector<LeuTab>("leu-tab")!
    const panel = el.querySelector<LeuTabPanel>("leu-tab-panel")!
    expect(tab.getAttribute("aria-controls")).to.equal("panel-custom")
    expect(panel.getAttribute("aria-labelledby")).to.equal("tab-custom")
  })

  it("re-links tabs and panels when a tab's id changes", async () => {
    const el = await defaultFixture()
    const tab = getTabs(el)[0]
    const panel = getPanels(el)[0]

    // Simulate id being set (e.g., late server render)
    tab.id = "new-tab-id"

    // MutationObserver fires asynchronously
    await new Promise((r) => setTimeout(r, 0))
    await el.updateComplete

    expect(panel.getAttribute("aria-labelledby")).to.equal("new-tab-id")
  })
})

// ─── Click selection ──────────────────────────────────────────────────────────

describe("LeuTabGroup – click selection", () => {
  it("clicking an inactive tab makes it the active tab", async () => {
    const el = await defaultFixture()
    const [, secondTab] = getTabs(el)

    secondTab.click()
    await el.updateComplete

    expect(el.active).to.equal("vor-ort")
  })

  it("clicking an inactive tab deactivates all other tabs", async () => {
    const el = await defaultFixture()
    const tabs = getTabs(el)

    tabs[1].click()
    await el.updateComplete

    const activeTabs = tabs.filter((t) => t.active)
    expect(activeTabs).to.have.length(1)
    expect(activeTabs[0].name).to.equal("vor-ort")
  })

  it("clicking an inactive tab activates the corresponding panel", async () => {
    const el = await defaultFixture()
    const tabs = getTabs(el)
    const panels = getPanels(el)

    tabs[2].click()
    await el.updateComplete

    const activePanel = panels.find((p) => p.active)!
    expect(activePanel.name).to.equal("per-post")
  })

  it("clicking an already-active tab has no effect", async () => {
    const el = await defaultFixture()
    const [firstTab] = getTabs(el)
    expect(el.active).to.equal("online")

    firstTab.click()
    await el.updateComplete

    expect(el.active).to.equal("online")
    expect(getTabs(el).filter((t) => t.active)).to.have.length(1)
  })

  it("programmatically setting active changes the active tab and panel", async () => {
    const el = await defaultFixture()

    el.active = "per-post"
    await el.updateComplete

    const activeTab = getTabs(el).find((t) => t.active)!
    const activePanel = getPanels(el).find((p) => p.active)!
    expect(activeTab.name).to.equal("per-post")
    expect(activePanel.name).to.equal("per-post")
  })
})

// ─── leu:show-tab-panel event ─────────────────────────────────────────────────

describe("LeuTabGroup – leu:show-tab-panel event", () => {
  it("fires leu:show-tab-panel when clicking an inactive tab", async () => {
    const el = await defaultFixture()
    const [, secondTab] = getTabs(el)

    setTimeout(() => secondTab.click())
    const event = (await oneEvent(el, "leu:show-tab-panel")) as CustomEvent

    expect(event).to.exist
    expect(event.detail.name).to.equal("vor-ort")
  })

  it("fires leu:show-tab-panel when active is changed programmatically", async () => {
    const el = await defaultFixture()

    setTimeout(() => {
      el.active = "per-post"
    })
    const event = (await oneEvent(el, "leu:show-tab-panel")) as CustomEvent

    expect(event.detail.name).to.equal("per-post")
  })

  it("does NOT fire leu:show-tab-panel when clicking an already-active tab", async () => {
    const el = await defaultFixture()
    const [firstTab] = getTabs(el)

    let firedCount = 0
    el.addEventListener("leu:show-tab-panel", () => {
      firedCount++
    })

    firstTab.click()
    await el.updateComplete

    expect(firedCount).to.equal(0)
  })

  it("fires leu:show-tab-panel on initial render when active is not pre-set", async () => {
    const showSpy = spy()

    await fixture<HTMLDivElement>(html`
      <div @leu:show-tab-panel=${showSpy}>
        <leu-tab-group>
          <leu-tab slot="tabs" name="a">A</leu-tab>
          <leu-tab-panel slot="panels" name="a">A</leu-tab-panel>
          <leu-tab slot="tabs" name="b">B</leu-tab>
          <leu-tab-panel slot="panels" name="b">B</leu-tab-panel>
        </leu-tab-group>
      </div>
    `)

    expect(showSpy).to.be.calledOnce
    expect(showSpy.args[0][0].detail.name).to.equal("a")
  })

  it("fires leu:show-tab-panel on initial render when active is pre-set", async () => {
    const showSpy = spy()

    await fixture<HTMLDivElement>(html`
      <div @leu:show-tab-panel=${showSpy}>
        <leu-tab-group active="b">
          <leu-tab slot="tabs" name="a">A</leu-tab>
          <leu-tab-panel slot="panels" name="a">A</leu-tab-panel>
          <leu-tab slot="tabs" name="b">B</leu-tab>
          <leu-tab-panel slot="panels" name="b">B</leu-tab-panel>
        </leu-tab-group>
      </div>
    `)

    expect(showSpy).to.be.calledOnce
    expect(showSpy.args[0][0].detail.name).to.equal("b")
  })
})

// ─── Keyboard control ─────────────────────────────────────────────────────────

describe("LeuTabGroup – keyboard control", () => {
  it("ArrowRight moves to the next tab", async () => {
    const el = await defaultFixture()

    await sendKeys({ press: "Tab" })
    await sendKeys({ press: "ArrowRight" })
    await el.updateComplete

    expect(el.active).to.equal("vor-ort")
  })

  it("ArrowLeft moves to the previous tab", async () => {
    const el = await defaultFixture({ active: "vor-ort" })

    await sendKeys({ press: "Tab" })
    await sendKeys({ press: "ArrowLeft" })
    await el.updateComplete

    expect(el.active).to.equal("online")
  })

  it("ArrowRight wraps from the last tab to the first", async () => {
    const el = await defaultFixture({ active: "per-post" })

    await sendKeys({ press: "Tab" })
    await sendKeys({ press: "ArrowRight" })
    await el.updateComplete

    expect(el.active).to.equal("online")
  })

  it("ArrowLeft wraps from the first tab to the last", async () => {
    const el = await defaultFixture()

    await sendKeys({ press: "Tab" })
    await sendKeys({ press: "ArrowLeft" })
    await el.updateComplete

    expect(el.active).to.equal("per-post")
  })

  it("Home key moves to the first tab", async () => {
    const el = await defaultFixture({ active: "per-post" })

    await sendKeys({ press: "Tab" })
    await sendKeys({ press: "Home" })
    await el.updateComplete

    expect(el.active).to.equal("online")
  })

  it("End key moves to the last tab", async () => {
    const el = await defaultFixture()

    await sendKeys({ press: "Tab" })
    await sendKeys({ press: "End" })
    await el.updateComplete

    expect(el.active).to.equal("per-post")
  })

  it("keyboard navigation moves focus to the newly active tab", async () => {
    const el = await defaultFixture()
    const tabs = getTabs(el)

    await sendKeys({ press: "Tab" })
    await sendKeys({ press: "ArrowRight" })
    await el.updateComplete
    await new Promise((r) => setTimeout(r, 0))

    expect(document.activeElement).to.equal(tabs[1])
  })

  it("non-navigation keys do not change the active tab", async () => {
    const el = await defaultFixture()

    await sendKeys({ press: "Tab" })
    for (const key of ["ArrowUp", "ArrowDown", "Enter", "Space"]) {
      await sendKeys({ press: key })
    }
    await el.updateComplete

    expect(el.active).to.equal("online")
  })

  it("keydown on an unfocused element does not trigger navigation", async () => {
    // A synthetic keydown dispatched on the host (not from a focused leu-tab)
    // must not reach the shadow-DOM tablist listener, so navigation must not occur.
    const el = await defaultFixture()

    el.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "ArrowRight",
        bubbles: true,
        composed: true,
      }),
    )
    await el.updateComplete

    expect(el.active).to.equal("online")
  })
})
