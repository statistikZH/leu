import { html } from "lit"
import { axe, fixture, oneEvent } from "../../../test/utils.js"

import "../leu-tab.js"
import type { LeuTab } from "../Tab.js"

async function defaultFixture() {
  return fixture<LeuTab>(html`<leu-tab name="test">Test</leu-tab>`)
}

async function activeFixture() {
  return fixture<LeuTab>(html`<leu-tab name="test" active>Test</leu-tab>`)
}

describe("LeuTab", () => {
  it("is a defined element", () => {
    expect(customElements.get("leu-tab")).toBeDefined()
  })

  it("passes the a11y audit inside a tablist", async () => {
    const wrapper = await fixture(html`
      <div role="tablist">
        <leu-tab name="test" active>Test</leu-tab>
      </div>
    `)
    expect(await axe(wrapper)).toHaveNoViolations()
  })

  it("sets role=tab on the host element", async () => {
    const el = await defaultFixture()
    expect(el.getAttribute("role")).toBe("tab")
  })

  it("auto-generates an id when none is provided", async () => {
    const el = await defaultFixture()
    expect(el.id).toMatch(/^leu-tab-\d+$/)
  })

  it("keeps a user-provided id", async () => {
    const el = await fixture<LeuTab>(
      html`<leu-tab id="my-custom-tab" name="test">Test</leu-tab>`,
    )
    expect(el.id).toBe("my-custom-tab")
  })

  it("generates distinct ids for separate instances", async () => {
    const el1 = await fixture<LeuTab>(html`<leu-tab name="a">A</leu-tab>`)
    const el2 = await fixture<LeuTab>(html`<leu-tab name="b">B</leu-tab>`)
    expect(el1.id).not.toBe(el2.id)
  })

  it("has ariaSelected=false and tabIndex=-1 when inactive", async () => {
    const el = await defaultFixture()
    expect(el.ariaSelected).toBe("false")
    expect(el.tabIndex).toBe(-1)
  })

  it("has ariaSelected=true and tabIndex=0 when active", async () => {
    const el = await activeFixture()
    expect(el.ariaSelected).toBe("true")
    expect(el.tabIndex).toBe(0)
  })

  it("updates ariaSelected and tabIndex reactively when active changes", async () => {
    const el = await defaultFixture()

    el.active = true
    await el.updateComplete
    expect(el.ariaSelected).toBe("true")
    expect(el.tabIndex).toBe(0)

    el.active = false
    await el.updateComplete
    expect(el.ariaSelected).toBe("false")
    expect(el.tabIndex).toBe(-1)
  })

  it("reflects the active property as a boolean attribute", async () => {
    const el = await defaultFixture()
    expect(el.hasAttribute("active")).toBe(false)

    el.active = true
    await el.updateComplete
    expect(el.hasAttribute("active")).toBe(true)

    el.active = false
    await el.updateComplete
    expect(el.hasAttribute("active")).toBe(false)
  })

  it("reflects the name property as an attribute", async () => {
    const el = await defaultFixture()
    expect(el.getAttribute("name")).toBe("test")
  })

  it("sets active=true when clicked", async () => {
    const el = await defaultFixture()
    expect(el.active).toBe(false)
    el.click()
    expect(el.active).toBe(true)
  })

  it("dispatches leu:tab-select with the tab name when clicked", async () => {
    const el = await fixture<LeuTab>(
      html`<leu-tab name="my-tab">Test</leu-tab>`,
    )
    setTimeout(() => el.click())
    const event = (await oneEvent(el, "leu:tab-select")) as CustomEvent
    expect(event.detail.name).toBe("my-tab")
  })

  it("dispatches leu:tab-select as a bubbling composed event", async () => {
    const el = await fixture<LeuTab>(
      html`<leu-tab name="bubble-test">Test</leu-tab>`,
    )
    // Listen on document to verify the event crosses shadow boundaries
    setTimeout(() => el.click())
    const event = (await oneEvent(document, "leu:tab-select")) as CustomEvent
    expect(event.bubbles).toBe(true)
    expect(event.composed).toBe(true)
    expect(event.detail.name).toBe("bubble-test")
  })

  it("does not dispatch leu:tab-select when already active", async () => {
    const el = await activeFixture()
    let fired = false
    el.addEventListener("leu:tab-select", () => {
      fired = true
    })
    el.click()
    expect(fired).toBe(false)
  })

  it("does not toggle off when clicking an already-active tab", async () => {
    const el = await activeFixture()
    el.click()
    expect(el.active).toBe(true)
  })
})
