import { html } from "lit"
import { classMap } from "lit/directives/class-map.js"
import "../leu-button.js"
import { ICONNAMES } from "../../icon/icon.js"

export default {
  title: "Button",
  component: "leu-button",
}

function Template({
  label,
  round,
  disabled,
  small,
  active,
  secondary,
  negative,
  icon,
  iconAfter,
  type,
}) {
  const component = html`
    <leu-button
      .label=${label}
      ?round=${round}
      ?small=${small}
      ?active=${active}
      ?secondary=${secondary}
      ?negative=${negative}
      ?disabled=${disabled}
      .icon=${icon}
      .iconAfter=${iconAfter}
      .type=${type}
    >
    </leu-button>
  `

  return html`
    <div
      style="${negative
        ? "background:var(--leu-color-accent-blue);"
        : ""}padding:40px;"
    >
      ${component}
    </div>
  `
}

const BUTTONTYPES = ["button", "submit", "reset"]

export const Regular = Template.bind({})
Regular.argTypes = {
  label: { type: "string" },
  icon: { control: "select", options: ICONNAMES },
  iconAfter: { control: "select", options: ICONNAMES },
  type: { control: "select", options: BUTTONTYPES },
}
Regular.args = {
  label: "Click Mich...",
  round: false,
  disabled: false,
  small: false,
  active: false,
  secondary: false,
  negative: false,
  icon: undefined,
  iconAfter: undefined,
  type: undefined,
}

function TemplateDev({ secondary, negative }) {
  const tableClass = classMap({
    secondary,
    negative,
    table: true,
  })
  return html`
    <style>
      .wrapper {
        padding: 20px;
        font-family: Helvetica;
      }
      .negative {
        background: var(--leu-color-accent-blue);
        color: #fff;
      }
      .table {
        display: grid;
        align-items: center;
        grid-template-columns: auto auto auto;
        gap: 20px;
        padding: 20px;
        margin-top: 20px;
      }
    </style>
    <div class="wrapper">
      <h2>
        ${secondary ? "Secondary" : "Primary"} on
        ${negative ? "color" : "white"} BG
      </h2>
      <div class=${tableClass}>
        <div>Normal</div>
        <div></div>
        <div></div>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Default"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Active"
          active=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Disabled"
          disabled=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="addNew"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="close"
          active=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="pin"
          disabled=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="addNew"
          round=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="close"
          round=""
          active=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="pin"
          round=""
          disabled=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Default"
          icon="addNew"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Active"
          active=""
          icon="close"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Disabled"
          disabled=""
          icon="pin"
        ></leu-button>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Default"
          iconAfter="addNew"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Active"
          active=""
          iconAfter="close"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Disabled"
          disabled=""
          iconAfter="pin"
        ></leu-button>

        <div style="padding-top:30px;">Small</div>
        <div></div>
        <div></div>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Default"
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Active"
          active=""
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Disabled"
          disabled=""
          small=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="addNew"
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="close"
          active=""
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="pin"
          disabled=""
          small=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="addNew"
          round=""
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="close"
          round=""
          active=""
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          icon="pin"
          round=""
          disabled=""
          small=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Default"
          icon="addNew"
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Active"
          active=""
          icon="close"
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Disabled"
          disabled=""
          icon="pin"
          small=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Default"
          iconAfter="addNew"
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Active"
          active=""
          iconAfter="close"
          small=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          ?secondary=${secondary}
          label="Disabled"
          disabled=""
          iconAfter="pin"
          small=""
        ></leu-button>
      </div>
    </div>
  `
}
export const Dev = TemplateDev.bind({})
Dev.argTypes = {
  // hide all unused props
  label: { table: { disable: true } },
  disabled: { table: { disable: true } },
  round: { table: { disable: true } },
  small: { table: { disable: true } },
  active: { table: { disable: true } },
  icon: { table: { disable: true } },
  iconAfter: { table: { disable: true } },
  type: { table: { disable: true } },
}
Dev.args = {
  secondary: false,
  negative: false,
}
