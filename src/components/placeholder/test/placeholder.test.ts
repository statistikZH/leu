import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../leu-placeholder.js"

async function defaultFixture() {
  return fixture(
    html`<leu-placeholder>
      <h2 slot="title">Keine Ergebnisse zu «Regoin Zürich» gefunden.</h2>
      <p slot="description">
        Überprüfen Sie die Schreibweise der eingegebenen Wörter. Versuchen Sie
        andere Stichwörter. Versuchen Sie allgemeinere Stichwörter.
      </p>
      <leu-button slot="cta"> Suche zurücksetzen </leu-button>
    </leu-placeholder>`,
  )
}

describe("LeuPlaceholder", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-placeholder")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
