import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

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
    expect(customElements.get("leu-tab-panel")).toBeDefined()
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
    expect(await axe(wrapper)).toHaveNoViolations()
  })

  it("sets role=tabpanel on the host element", async () => {
    const el = await defaultFixture()
    expect(el.getAttribute("role")).toBe("tabpanel")
  })

  it("sets tabIndex=0 on the host element", async () => {
    const el = await defaultFixture()
    expect(el.tabIndex).toBe(0)
  })

  it("auto-generates an id when none is provided", async () => {
    const el = await defaultFixture()
    expect(el.id).toMatch(/^leu-tab-panel-\d+$/)
  })

  it("keeps a user-provided id", async () => {
    const el = await fixture<LeuTabPanel>(
      html`<leu-tab-panel id="my-panel" name="test">Content</leu-tab-panel>`,
    )
    expect(el.id).toBe("my-panel")
  })

  it("generates distinct ids for separate instances", async () => {
    const el1 = await fixture<LeuTabPanel>(
      html`<leu-tab-panel name="a">A</leu-tab-panel>`,
    )
    const el2 = await fixture<LeuTabPanel>(
      html`<leu-tab-panel name="b">B</leu-tab-panel>`,
    )
    expect(el1.id).not.toBe(el2.id)
  })

  it("has ariaHidden=true when inactive (default)", async () => {
    const el = await defaultFixture()
    expect(el.ariaHidden).toBe("true")
  })

  it("has ariaHidden=false when active", async () => {
    const el = await activeFixture()
    expect(el.ariaHidden).toBe("false")
  })

  it("updates ariaHidden reactively when active changes", async () => {
    const el = await defaultFixture()

    el.active = true
    await el.updateComplete
    expect(el.ariaHidden).toBe("false")

    el.active = false
    await el.updateComplete
    expect(el.ariaHidden).toBe("true")
  })

  it("renders slotted content", async () => {
    const el = await fixture<LeuTabPanel>(
      html`<leu-tab-panel name="test" active
        ><p>Panel content</p></leu-tab-panel
      >`,
    )
    expect(el.textContent).toBe("Panel content")
  })
})
