import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-tab-panel.js"
import type { LeuTabPanel } from "../TabPanel.js"

async function defaultFixture() {
  return fixture<LeuTabPanel>(
    html`<leu-tab-panel name="test">Content</leu-tab-panel>`,
  )
}

async function activeFixture() {
  return fixture<LeuTabPanel>(
    html`<leu-tab-panel name="test" active>Content</leu-tab-panel>`,
  )
}

describe("LeuTabPanel", () => {
  it("is a defined element", () => {
    expect(customElements.get("leu-tab-panel")).not.to.be.undefined
  })

  it("passes the a11y audit in a proper tab context", async () => {
    const wrapper = await fixture(html`
      <div>
        <div role="tablist">
          <div id="panel-tab" role="tab" aria-selected="true" tabindex="0">
            Tab
          </div>
        </div>
        <leu-tab-panel aria-labelledby="panel-tab" name="test" active
          >Content</leu-tab-panel
        >
      </div>
    `)
    await expect(wrapper).to.be.accessible()
  })

  it("sets role=tabpanel on the host element", async () => {
    const el = await defaultFixture()
    expect(el.getAttribute("role")).to.equal("tabpanel")
  })

  it("sets tabIndex=0 on the host element", async () => {
    const el = await defaultFixture()
    expect(el.tabIndex).to.equal(0)
  })

  it("auto-generates an id when none is provided", async () => {
    const el = await defaultFixture()
    expect(el.id).to.match(/^leu-tab-panel-\d+$/)
  })

  it("keeps a user-provided id", async () => {
    const el = await fixture<LeuTabPanel>(
      html`<leu-tab-panel id="my-panel" name="test">Content</leu-tab-panel>`,
    )
    expect(el.id).to.equal("my-panel")
  })

  it("generates distinct ids for separate instances", async () => {
    const el1 = await fixture<LeuTabPanel>(
      html`<leu-tab-panel name="a">A</leu-tab-panel>`,
    )
    const el2 = await fixture<LeuTabPanel>(
      html`<leu-tab-panel name="b">B</leu-tab-panel>`,
    )
    expect(el1.id).not.to.equal(el2.id)
  })

  it("has ariaHidden=true when inactive (default)", async () => {
    const el = await defaultFixture()
    expect(el.ariaHidden).to.equal("true")
  })

  it("has ariaHidden=false when active", async () => {
    const el = await activeFixture()
    expect(el.ariaHidden).to.equal("false")
  })

  it("updates ariaHidden reactively when active changes", async () => {
    const el = await defaultFixture()

    el.active = true
    await el.updateComplete
    expect(el.ariaHidden).to.equal("false")

    el.active = false
    await el.updateComplete
    expect(el.ariaHidden).to.equal("true")
  })

  it("renders slotted content", async () => {
    const el = await fixture<LeuTabPanel>(
      html`<leu-tab-panel name="test" active
        ><p>Panel content</p></leu-tab-panel
      >`,
    )
    expect(el).to.have.text("Panel content")
  })
})
