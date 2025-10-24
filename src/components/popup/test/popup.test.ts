import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import { LeuPopup } from "../leu-popup.js"

async function defaultFixture() {
  return fixture<LeuPopup>(html`
    <leu-popup
      ><div slot="anchor"></div>
      <p>Popup content</p></leu-popup
    >
  `)
}

describe("LeuPopup", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-popup")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })

  it("moves content to the position of a virtual element", async () => {
    const popup = await fixture<LeuPopup>(
      html`<leu-popup ?active=${true} placement="bottom-start"
          ><div slot="anchor"></div>
          <div
            style="background: white; border: 1px solid black; padding: 0.5rem"
          >
            Popup content
          </div></leu-popup
        >
        <style>
          * {
            margin: 0;
            padding: 0;
          }
        </style> `,
    )

    popup.anchor = {
      getBoundingClientRect: () => new DOMRect(32, 125, 0, 0),
    }

    popup.reposition()

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve())
    })

    const popupContent =
      popup.shadowRoot!.querySelector<HTMLDivElement>(".popup")

    expect(popupContent.style.left).to.equal("32px")
    expect(popupContent.style.top).to.equal("125px")
  })
})
