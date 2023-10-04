import { html } from "lit"
import { classMap } from "lit/directives/class-map.js"
import "../../../exports/define/button.js"
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
  round: { type: "boolean" },
  disabled: { type: "boolean" },
  small: { type: "boolean" },
  active: { type: "boolean" },
  secondary: { type: "boolean" },
  negative: { type: "boolean" },
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

function TemplateVariants({ secondary, negative }) {
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
        margin-top: 20px;
      }
    </style>
    <div class="wrapper">
      <h2>Primary:</h2>
      <div class=${tableClass}>
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
      </div>
    </div>
  `
}
export const Variants = TemplateVariants.bind({})
Variants.args = {
  secondary: false,
  negative: false,
}
