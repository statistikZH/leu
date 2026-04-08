import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { fixture, expect } from "@open-wc/testing"

import "../leu-tab-group.js"
import "../leu-tab.js"
import "../leu-tab-panel.js"

type TestArgs = {
  active?: string
}

async function defaultFixture(args: TestArgs = {}) {
  return fixture(html`
    <leu-tab-group active=${ifDefined(args.active)}>
      <leu-tab slot="tabs" name="online">Online</leu-tab>
      <leu-tab-panel slot="panels" name="online">
        <p>
          Online – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde, müssen
          Sie ein neues Passfoto machen. Ihr Reisebüro oder das Konsulat Ihres
          Reiseziels können Ihnen dabei helfen.
        </p>
      </leu-tab-panel>
      <leu-tab slot="tabs" name="vor-ort">Vor Ort</leu-tab>

      <leu-tab-panel slot="panels" name="vor-ort">
        <p>
          Vor Ort – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde,
          müssen Sie ein neues Passfoto machen. Ihr Reisebüro oder das Konsulat
          Ihres Reiseziels können Ihnen dabei helfen.
        </p>
      </leu-tab-panel>

      <leu-tab slot="tabs" name="per-post">Per Post</leu-tab>
      <leu-tab-panel slot="panels" name="per-post">
        <p>
          Per Post – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde,
          müssen Sie ein neues Passfoto machen. Ihr Reisebüro oder das Konsulat
          Ihres Reiseziels können Ihnen dabei helfen.
        </p>
      </leu-tab-panel>

      <leu-tab slot="tabs" name="telefonisch">Telefonisch</leu-tab>
      <leu-tab-panel slot="panels" name="telefonisch">
        <p>
          Telefonisch – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde,
          müssen Sie ein neues Passfoto machen. Ihr Reisebüro oder das Konsulat
          Ihres Reiseziels können Ihnen dabei helfen.
        </p>
      </leu-tab-panel>

      <leu-tab slot="tabs" name="service">Service</leu-tab>
      <leu-tab-panel slot="panels" name="service">
        <p>
          Service – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde,
          müssen Sie ein neues Passfoto machen. Ihr Reisebüro oder das Konsulat
          Ihres Reiseziels können Ihnen dabei helfen.
        </p>
      </leu-tab-panel>
    </leu-tab-group>
  `)
}

describe("LeuTab", () => {
  it("is a defined element", async () => {
    const el = customElements.get("leu-tab")

    expect(el).not.to.be.undefined
  })

  it("passes the a11y audit", async () => {
    const el = await defaultFixture()

    await expect(el).shadowDom.to.be.accessible()
  })
})
