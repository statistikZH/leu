import { html } from "lit"
import { axe, fixture } from "../../../test/utils.js"

import "../leu-table.js"

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
  return fixture(
    html`<leu-table .columns=${columns} .data=${data}> </leu-table>`,
  )
}

describe("LeuTable", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-table")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    expect(await axe(el)).toHaveNoViolations()
  })
})
