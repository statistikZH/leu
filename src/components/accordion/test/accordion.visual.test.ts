import { visualDiff } from "@web/test-runner-visual-regression"
import { fixture } from "@open-wc/testing"
import { setViewport } from "@web/test-runner-commands"
import { html } from "lit"

import "../leu-accordion.js"

async function defaultFixture() {
  return fixture(html`
    <leu-accordion label="Titel des Akkordeons"
      ><div slot="content">Das ist der Inhalt</div></leu-accordion
    >
  `)
}

const VIEWPORTS = {
  small: 400,
  regular: 600,
  medium: 840,
  large: 1024,
  xlarge: 1280,
}

function describeViewports(
  viewports: Array<keyof typeof VIEWPORTS>,
  fn: (this: Mocha.Suite) => void,
) {
  viewports.forEach((viewport) => {
    describe(`viewport=${viewport}`, () => {
      before(async () => {
        await setViewport({ width: VIEWPORTS[viewport], height: 800 })
      })

      fn.call(this)
    })
  })
}

describeViewports(["small", "regular", "medium", "large", "xlarge"], () => {
  it("LeuAccordion", async function test() {
    const el = await defaultFixture()

    const button = el.shadowRoot.querySelector("button")
    button.click()

    await visualDiff(el, this.test.fullTitle().replaceAll(" ", "-"))
  })
})
