import { html } from "lit"
import { userEvent } from "vitest/browser"
import { axe, fixture } from "../../../test/utils.js"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-pagination.js"

async function defaultFixture(args = {}) {
  return fixture(
    html`<leu-pagination
      numOfItems=${ifDefined(args.numOfItems)}
      itemsPerPage=${ifDefined(args.itemsPerPage)}
      defaultPage=${ifDefined(args.defaultPage)}
    >
    </leu-pagination>`,
  )
}

describe("LeuPagination", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-pagination")

    expect(el).toBeDefined()
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 1,
    })

    expect(await axe(el)).toHaveNoViolations()
  })

  it("disables the previous button on the first page", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 1,
    })

    const previous = el.shadowRoot.querySelectorAll("leu-button")[0]

    expect(previous).toHaveAttribute("disabled")
  })

  it("disables the next button on the last page", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 14,
    })

    const next = el.shadowRoot.querySelectorAll("leu-button")[1]

    expect(next).toHaveAttribute("disabled")
  })

  it("renders the correct number of available pages", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 1,
    })

    const label = el.shadowRoot.querySelector(".label")

    expect(label.textContent.trim()).toBe("von 14")
  })

  it("displays the current page", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 2,
    })

    const input = el.shadowRoot.querySelector("input")

    expect(input.value).toBe("2")
  })

  it("increments the page with a click on the next button", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 1,
    })

    const next = el.shadowRoot.querySelectorAll("leu-button")[1]

    next.click()
    await el.updateComplete

    expect(el.page).toBe(2)
  })

  it("decrements the page with a click on the prev button", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 10,
    })

    const next = el.shadowRoot.querySelectorAll("leu-button")[0]

    next.click()
    await el.updateComplete

    expect(el.page).toBe(9)
  })

  it("increments the page with pressing the arrow up key", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 1,
    })

    el.focus()

    await userEvent.keyboard("{ArrowUp}")
    await el.updateComplete

    expect(el.page).toBe(2)
  })

  it("decrements the page with pressing the arrow down key", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 13,
    })

    el.focus()

    await userEvent.keyboard("{ArrowDown}")
    await el.updateComplete

    expect(el.page).toBe(12)
  })

  it("bounds the page to the max and min values", async () => {
    const el = await defaultFixture({
      numOfItems: 50,
      itemsPerPage: 10,
      defaultPage: 6,
    })

    const input = el.shadowRoot.querySelector("input")

    expect(el.page).toBe(5)
    expect(input.value).toBe("5")

    el.page = 0
    await el.updateComplete

    expect(el.page).toBe(1)
    expect(input.value).toBe("1")

    el.focus()

    await userEvent.keyboard("{ArrowDown}")
    await el.updateComplete

    expect(el.page).toBe(1)
    expect(input.value).toBe("1")

    await userEvent.keyboard("{ArrowUp}")
    await userEvent.keyboard("{ArrowUp}")
    await userEvent.keyboard("{ArrowUp}")
    await userEvent.keyboard("{ArrowUp}")
    await userEvent.keyboard("{ArrowUp}")

    expect(el.page).toBe(5)
    expect(input.value).toBe("5")
  })

  it("fires a leu:pagechange event", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      defaultPage: 7,
    })

    const eventSpy = vi.fn()
    el.addEventListener("leu:pagechange", eventSpy)

    const prevButton = el.shadowRoot.querySelectorAll("leu-button")[0]
    const nextButton = el.shadowRoot.querySelectorAll("leu-button")[1]

    nextButton.click()
    prevButton.click()

    el.focus()

    await userEvent.keyboard("{ArrowUp}")
    await userEvent.keyboard("{ArrowDown}")

    expect(eventSpy).toHaveBeenCalledTimes(4)
  })
})
