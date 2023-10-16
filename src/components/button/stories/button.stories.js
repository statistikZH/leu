import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import "../leu-button.js"
import { ICON_NAMES } from "../../icon/icon.js"
import { BUTTON_VARIANTS, BUTTON_TYPES, BUTTON_SIZES } from "../Button.js"

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
  variant,
  disabled,
  icon,
  iconAfter,
  type,
}) {
  const component = html`
    <leu-button
      label=${ifDefined(label)}
      size=${ifDefined(size)}
      variant=${ifDefined(variant)}
      icon=${ifDefined(icon)}
      iconAfter=${ifDefined(iconAfter)}
      type=${ifDefined(type)}
      ?round=${round}
      ?active=${active}
      ?negative=${negative}
      ?disabled=${disabled}
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
  size: { control: "select", options: BUTTON_SIZES },
  variant: { control: "select", options: BUTTON_VARIANTS },
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
  variant: null,
  type: null,
}
