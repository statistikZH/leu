import { Meta, StoryObj } from "@storybook/web-components-vite"
import { action } from "storybook/actions"
import { html } from "lit"

import { LeuTabGroup } from "../leu-tab-group.js"
import "../leu-tab-group.js"
import "../leu-tab.js"
import "../leu-tab-panel.js"
import { ifDefined } from "lit/directives/if-defined.js"

type StoryArgs = LeuTabGroup
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/Tab",
  component: "leu-tab-group",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?node-id=21161-184423",
    },
  },
  args: {
    onLeuTabPanelShow: action("leu:show-tab-panel"),
  },
} satisfies Meta<StoryArgs>

interface Args {
  active?: string
}

const Template: Story = {
  render: (args: Args = {}) => {
    return html`
      <leu-tab-group
        active=${ifDefined(args.active)}
        @leu:show-tab-panel=${(e) => {
          console.log(e)
          args.onLeuTabPanelShow(e)
        }}
      >
        <leu-tab slot="tabs" name="online">Online</leu-tab>
        <leu-tab-panel slot="panels" name="online">
          <p>
            Online – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde,
            müssen Sie ein neues Passfoto machen. Ihr Reisebüro oder das
            Konsulat Ihres Reiseziels können Ihnen dabei helfen.
          </p>
        </leu-tab-panel>
        <leu-tab slot="tabs" name="vor-ort">Vor Ort</leu-tab>

        <leu-tab-panel slot="panels" name="vor-ort">
          <p>
            Vor Ort – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde,
            müssen Sie ein neues Passfoto machen. Ihr Reisebüro oder das
            Konsulat Ihres Reiseziels können Ihnen dabei helfen.
          </p>
        </leu-tab-panel>

        <leu-tab slot="tabs" name="per-post">Per Post</leu-tab>
        <leu-tab-panel slot="panels" name="per-post">
          <p>
            Per Post – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde,
            müssen Sie ein neues Passfoto machen. Ihr Reisebüro oder das
            Konsulat Ihres Reiseziels können Ihnen dabei helfen.
          </p>
        </leu-tab-panel>

        <leu-tab slot="tabs" name="telefonisch">Telefonisch</leu-tab>
        <leu-tab-panel slot="panels" name="telefonisch">
          <p>
            Telefonisch – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde,
            müssen Sie ein neues Passfoto machen. Ihr Reisebüro oder das
            Konsulat Ihres Reiseziels können Ihnen dabei helfen.
          </p>
        </leu-tab-panel>

        <leu-tab slot="tabs" name="service">Service</leu-tab>
        <leu-tab-panel slot="panels" name="service">
          <p>
            Service – Wenn Ihr Ausweis vor dem 01.01.2013 ausgestellt wurde,
            müssen Sie ein neues Passfoto machen. Ihr Reisebüro oder das
            Konsulat Ihres Reiseziels können Ihnen dabei helfen.
          </p>
        </leu-tab-panel>
      </leu-tab-group>
    `
  },
}

export const Regular = {
  ...Template,
  args: {
    active: "online",
  },
}
