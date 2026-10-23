import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-popup.js"
import { LeuPopup } from "../Popup.js"

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

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
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

    expect(popupContent.style.left).toBe("32px")
    expect(popupContent.style.top).toBe("125px")
  })

  it("applies offset properties correctly", async () => {
    const popup = await fixture<LeuPopup>(
      html`<leu-popup
        ?active=${true}
        placement="bottom-start"
        offset-main-axis="12"
        offset-cross-axis="9"
      >
        <div
          slot="anchor"
          style="width: 16px; height: 16px; position: absolute; top: 0; left: 0;"
        ></div>
        <div style="background: white; padding: 0.5rem">Popup content</div>
      </leu-popup>`,
    )

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve())
    })

    const popupContent =
      popup.shadowRoot!.querySelector<HTMLDivElement>(".popup")

    expect(popupContent.style.left).toBe("9px") // offset-cross-axis
    expect(popupContent.style.top).toBe("28px") // offset-main-axis + anchor height
  })
})
