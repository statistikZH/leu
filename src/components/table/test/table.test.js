import { html } from "lit"
import { fixture, expect } from "@open-wc/testing"

import "../../../exports/define/table.js"

const columns = [
  { name: "Id", value: (row) => row.id },
  { name: "Name", value: (row) => row.name },
  { name: "Menge", value: (row) => row.menge },
]

const data = [
  { id: 1, name: "Apfel", menge: 4 },
  { id: 2, name: "Birne", menge: 2 },
  { id: 3, name: "Banane", menge: 3 },
  { id: 4, name: "Orange", menge: 7 },
]

async function defaultFixture() {
  return fixture(html`<leu-table .columns=${columns} .data=${data}>
  </leu-table>`)
}

describe("LeuTable", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-table")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
