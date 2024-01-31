import { html } from "lit"
import { fixture, expect, elementUpdated } from "@open-wc/testing"
import { ifDefined } from "lit/directives/if-defined.js"
import { sendKeys } from "@web/test-runner-commands"
import { spy } from "sinon"

import "../leu-pagination.js"

async function defaultFixture(args = {}) {
  return fixture(html`<leu-pagination
    numOfItems=${ifDefined(args.numOfItems)}
    itemsPerPage=${ifDefined(args.itemsPerPage)}
    page=${ifDefined(args.page)}
  >
  </leu-pagination>`)
}

describe("LeuPagination", () => {
  it("is a defined element", async () => {
    const el = await customElements.get("leu-pagination")

    await expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 1,
    })

    await expect(el).shadowDom.to.be.accessible()
  })

  it("disables the previous button on the first page", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 1,
    })

    const previous = el.shadowRoot.querySelectorAll("leu-button")[0]

    expect(previous).to.have.attribute("disabled")
  })

  it("disables the next button on the last page", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 14,
    })

    const next = el.shadowRoot.querySelectorAll("leu-button")[1]

    expect(next).to.have.attribute("disabled")
  })

  it("renders the correct number of available pages", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 1,
    })

    const label = el.shadowRoot.querySelectorAll(".label")

    expect(label).to.have.trimmed.text("von 14")
  })

  it("displays the current page", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 2,
    })

    const input = el.shadowRoot.querySelector("input")

    expect(input.value).to.equal("2")
  })

  it("increments the page with a click on the next button", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 1,
    })

    const next = el.shadowRoot.querySelectorAll("leu-button")[1]

    next.click()
    await elementUpdated(el)

    expect(el.page).to.equal(2)
  })

  it("decrements the page with a click on the prev button", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 10,
    })

    const next = el.shadowRoot.querySelectorAll("leu-button")[0]

    next.click()
    await elementUpdated(el)

    expect(el.page).to.equal(9)
  })

  it("increments the page with pressing the arrow up key", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 1,
    })

    // TODO: replace with el.focus() as soon as delegateFocus is set
    await sendKeys({
      press: "Tab",
    })
    await sendKeys({
      press: "ArrowUp",
    })
    await elementUpdated(el)

    expect(el.page).to.equal(2)
  })

  it("decrements the page with pressing the arrow down key", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 13,
    })

    // TODO: replace with el.focus() as soon as delegateFocus is set
    const input = el.shadowRoot.querySelector("input")
    input.focus()

    await sendKeys({
      press: "ArrowDown",
    })
    await elementUpdated(el)

    expect(el.page).to.equal(12)
  })

  it("bounds the page to the max and min values", async () => {
    const el = await defaultFixture({
      numOfItems: 50,
      itemsPerPage: 10,
      page: 6,
    })

    const input = el.shadowRoot.querySelector("input")

    expect(el.boundPage).to.equal(5)
    expect(input.value).to.equal("5")

    el.page = 0
    await elementUpdated(el)

    expect(el.boundPage).to.equal(1)
    expect(input.value).to.equal("1")

    // TODO: replace with el.focus() as soon as delegateFocus is set
    input.focus()

    await sendKeys({
      press: "ArrowDown",
    })
    await elementUpdated(el)

    expect(el.boundPage).to.equal(1)
    expect(input.value).to.equal("1")

    await sendKeys({ press: "ArrowUp" })
    await sendKeys({ press: "ArrowUp" })
    await sendKeys({ press: "ArrowUp" })
    await sendKeys({ press: "ArrowUp" })
    await sendKeys({ press: "ArrowUp" })

    expect(el.boundPage).to.equal(5)
    expect(input.value).to.equal("5")
  })

  it("fires a leu:pagechange event", async () => {
    const el = await defaultFixture({
      numOfItems: 98,
      itemsPerPage: 7,
      page: 14,
    })

    const eventSpy = spy()
    el.addEventListener("leu:pagechange", eventSpy)

    const prevButton = el.shadowRoot.querySelectorAll("leu-button")[0]
    const nextButton = el.shadowRoot.querySelectorAll("leu-button")[1]

    nextButton.click()
    prevButton.click()

    // TODO: replace with el.focus() as soon as delegateFocus is set
    const input = el.shadowRoot.querySelector("input")
    input.focus()

    await sendKeys({ press: "ArrowUp" })
    await sendKeys({ press: "ArrowDown" })

    expect(eventSpy).to.have.been.called.callCount(2)
  })
})
