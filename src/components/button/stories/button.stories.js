import { html } from "lit"
import { classMap } from "lit/directives/class-map.js"
import "../leu-button.js"
import { ICON_NAMES } from "../../icon/icon.js"
import { BUTTON_MODES, BUTTON_TYPES, BUTTON_SIZES } from "../button.js"

export default {
  title: "Button",
  component: "leu-button",
}

function Template({
  label,
  round,
  size,
  active,
  negative,
  mode,
  icon,
  iconAfter,
  type,
}) {
  const component = html`
    <leu-button
      .label=${label}
      ?round=${round}
      .size=${size}
      ?active=${active}
      ?negative=${negative}
      .mode=${mode}
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

export const Regular = Template.bind({})
Regular.argTypes = {
  label: { type: "string" },
  icon: { control: "select", options: ICON_NAMES },
  iconAfter: { control: "select", options: ICON_NAMES },
  type: { control: "select", options: BUTTON_TYPES },
  size: {
    control: "select",
    options: BUTTON_SIZES,
    defaultValue: BUTTON_SIZES[0],
  },
  mode: { control: "select", options: BUTTON_MODES },
}
Regular.args = {
  label: "Click Mich...",
  round: false,
  disabled: false,
  active: false,
  negative: false,
  icon: null,
  iconAfter: null,
  size: null,
  mode: null,
  type: null,
}

function TemplateDev({ secondary, negative }) {
  const tableClass = classMap({
    secondary,
    negative,
    table: true,
  })
  const mode = secondary ? "secondary" : "primary"
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
          mode=${mode}
          label="Default"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Active"
          active=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Disabled"
          disabled=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="addNew"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="close"
          active=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="pin"
          disabled=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="addNew"
          round=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="close"
          round=""
          active=""
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="pin"
          round=""
          disabled=""
        ></leu-button>

        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Default"
          icon="addNew"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Active"
          active=""
          icon="close"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Disabled"
          disabled=""
          icon="pin"
        ></leu-button>

        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Default"
          iconAfter="addNew"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Active"
          active=""
          iconAfter="close"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Disabled"
          disabled=""
          iconAfter="pin"
        ></leu-button>

        <div style="padding-top:30px;">Small</div>
        <div></div>
        <div></div>

        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Default"
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Active"
          active=""
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Disabled"
          disabled=""
          size="small"
        ></leu-button>

        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="addNew"
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="close"
          active=""
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="pin"
          disabled=""
          size="small"
        ></leu-button>

        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="addNew"
          round=""
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="close"
          round=""
          active=""
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          icon="pin"
          round=""
          disabled=""
          size="small"
        ></leu-button>

        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Default"
          icon="addNew"
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Active"
          active=""
          icon="close"
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Disabled"
          disabled=""
          icon="pin"
          size="small"
        ></leu-button>

        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Default"
          iconAfter="addNew"
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Active"
          active=""
          iconAfter="close"
          size="small"
        ></leu-button>
        <leu-button
          ?negative=${negative}
          mode=${mode}
          label="Disabled"
          disabled=""
          iconAfter="pin"
          size="small"
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
  size: { table: { disable: true } },
  active: { table: { disable: true } },
  icon: { table: { disable: true } },
  iconAfter: { table: { disable: true } },
  type: { table: { disable: true } },
  mode: { table: { disable: true } },
}
Dev.args = {
  secondary: false,
  negative: false,
}
