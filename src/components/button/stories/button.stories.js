import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { classMap } from "lit/directives/class-map.js"
import "../leu-button.js"
import { ICON_NAMES } from "../../icon/icon.js"
import {
  BUTTON_VARIANTS,
  BUTTON_TYPES,
  BUTTON_SIZES,
  BUTTON_EXPANDED_OPTIONS,
} from "../Button.js"

function copyContent(params) {
  const string = `<leu-button${Object.values(params)
    .filter((o) => o)
    .join("")}>\n</leu-button>`
  navigator.clipboard.writeText(string)
}

export default {
  title: "Button",
  component: "leu-button",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=4-1444&mode=design&t=xu5Vii8jXKKCKDez-0",
    },
  },
}

function Template({
  label,
  round,
  size,
  active,
  inverted,
  variant,
  disabled,
  icon,
  iconAfter,
  type,
  expanded,
}) {
  const params = {
    label: label ? ` label="${label}"` : undefined,
    size: size === "small" ? ' size="small"' : undefined,
    variant: variant !== "primary" ? ` variant="${variant}"` : undefined,
    icon: icon ? ` icon="${icon}"` : undefined,
    iconAfter: iconAfter ? ` icon="${iconAfter}"` : undefined,
    round: round ? " round" : undefined,
    active: active ? " active" : undefined,
    disabled: disabled ? " disabled" : undefined,
    inverted: inverted ? " inverted" : undefined,
    expanded: expanded ? ` expanded="${expanded}"` : undefined,
  }
  const component = html`
    <leu-button
      label=${ifDefined(label)}
      size=${ifDefined(size)}
      variant=${ifDefined(variant)}
      icon=${ifDefined(icon)}
      iconAfter=${ifDefined(iconAfter)}
      type=${ifDefined(type)}
      expanded=${ifDefined(expanded)}
      ?round=${round}
      ?active=${active}
      ?inverted=${inverted}
      ?disabled=${disabled}
      @click=${() => copyContent(params)}
    >
    </leu-button>
    <br />
    <p>Click the button to copy the code to the clipboard</p>
  `

  return html`
    <style>
      * {
        font-family: Helvetica;
      }
    </style>
    <div
      style="${inverted
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
  type: { control: "radio", options: BUTTON_TYPES },
  size: { control: "radio", options: BUTTON_SIZES },
  variant: { control: "radio", options: BUTTON_VARIANTS },
  expanded: { control: "radio", options: BUTTON_EXPANDED_OPTIONS },
}
Regular.args = {
  label: "Click Mich...",
  round: false,
  disabled: false,
  active: false,
  inverted: false,

  icon: null,
  iconAfter: null,
  size: null,
  variant: null,
  type: null,
}

const items = [
  { label: "Normal" },
  { label: "Active", active: true },
  { label: "Disabled", disabled: true },

  { label: "Normal", icon: "calendar" },
  { label: "Active", icon: "calendar", active: true },
  { label: "Disabled", icon: "calendar", disabled: true },

  { label: "Normal", iconAfter: "calendar" },
  { label: "Active", iconAfter: "calendar", active: true },
  { label: "Disabled", iconAfter: "calendar", disabled: true },

  { icon: "calendar" },
  { icon: "calendar", active: true },
  { icon: "calendar", disabled: true },

  { icon: "calendar", round: true },
  { icon: "calendar", round: true, active: true },
  { icon: "calendar", round: true, disabled: true },
]

const ghostItems = [
  { label: "Normal", icon: "calendar" },
  { label: "Active", icon: "calendar", active: true },
  { label: "Disabled", icon: "calendar", disabled: true },

  { label: "Normal", icon: "calendar", expanded: "closed" },
  { label: "Active", icon: "calendar", active: true, expanded: "closed" },
  { label: "Disabled", icon: "calendar", disabled: true, expanded: "closed" },

  { label: "Normal", iconAfter: "calendar" },
  { label: "Active", iconAfter: "calendar", active: true },
  { label: "Disabled", iconAfter: "calendar", disabled: true },
]

const sizes = [
  {
    size: "normal",
    items,
  },
  {
    size: "small",
    items,
  },
]

const groups = [
  {
    inverted: false,
    variant: "primary",
    sizes,
  },
  {
    inverted: false,
    variant: "secondary",
    sizes,
  },
  {
    inverted: false,
    variant: "ghost",
    sizes: [{ size: "normal", items: ghostItems }],
  },
  {
    inverted: true,
    variant: "primary",
    sizes,
  },
  {
    inverted: true,
    variant: "secondary",
    sizes,
  },
  {
    inverted: true,
    variant: "ghost",
    sizes: [{ size: "normal", items: ghostItems }],
  },
]

function TemplateOverview() {
  return html` <style>
      .codeblock {
        position: relative;
      }
      .codeblock > pre {
        background-image: repeating-linear-gradient(
          #acc,
          #acc 8px,
          #9bb 0,
          #9bb 24px,
          #acc 0,
          #acc 32px
        );
        background-attachment: local;
        border: 1px solid #999;
        color: #000;
        font-family: monospace;
        font-size: 14px;
        line-height: 16px;
        max-height: 400px;
        overflow: scroll;
        overflow: auto;
        padding: 8px;
        resize: none;
        unicode-bidi: embed;
        width: 100%;
        box-sizing: border-box;
      }
      .codeblock > leu-button {
        position: absolute;
        right: 10px;
        top: 10px;
      }
      * {
        font-family: Helvetica;
      }
      p {
        margin: 0 20px;
      }
      h2 {
        margin: 50px 0 20px 20px;
      }
      .group {
        padding: 20px;
      }
      .inverted {
        background: var(--leu-color-accent-blue);
        color: #fff;
      }
      .main-table {
        display: grid;
        align-items: start;
        grid-template-columns: auto auto;
        gap: 10px;
        padding: 10px;
      }
      .table {
        display: grid;
        align-items: center;
        grid-template-columns: auto auto auto;
        gap: 10px;
        padding: 10px;
      }
    </style>
    ${groups.map(
      (group) =>
        html`
          <h2>${group.variant + (group.inverted ? " + inverted" : "")}</h2>
          <div
            class=${classMap({
              "main-table": true,
              group: true,
              inverted: group.inverted,
            })}
          >
            ${group.sizes.map(
              (size) =>
                html`
                  <div>
                    <div class=${classMap({ table: true })}>
                      ${size.items.map((item) => {
                        const params = {
                          label: item.label
                            ? ` label="${item.label}"`
                            : undefined,
                          size:
                            size.size === "small" ? ' size="small"' : undefined,
                          variant:
                            group.variant !== "primary"
                              ? ` variant="${group.variant}"`
                              : undefined,
                          icon: item.icon ? ` icon="${item.icon}"` : undefined,
                          iconAfter: item.iconAfter
                            ? ` icon="${item.iconAfter}"`
                            : undefined,
                          round: item.round ? " round" : undefined,
                          active: item.active ? " active" : undefined,
                          disabled: item.disabled ? " disabled" : undefined,
                          inverted: group.inverted ? " inverted" : undefined,
                          expanded: item.expanded
                            ? ` expanded="${item.expanded}"`
                            : undefined,
                        }
                        return html`
                          <leu-button
                            label=${ifDefined(item.label)}
                            size=${ifDefined(size.size)}
                            variant=${ifDefined(group.variant)}
                            icon=${ifDefined(item.icon)}
                            iconAfter=${ifDefined(item.iconAfter)}
                            expanded=${ifDefined(item.expanded)}
                            ?round=${item.round}
                            ?active=${item.active}
                            ?disabled=${item.disabled}
                            ?inverted=${group.inverted}
                            @click=${() => copyContent(params)}
                          >
                          </leu-button>
                        `
                      })}
                    </div>
                  </div>
                `
            )}
          </div>
          <p>Click the button to copy the code to the clipboard</p>
        `
    )}`
}

export const Overview = TemplateOverview.bind({})
Overview.argTypes = {
  label: { table: { disable: true } },
  icon: { table: { disable: true } },
  iconAfter: { table: { disable: true } },
  size: { table: { disable: true } },
  variant: { table: { disable: true } },
  type: { table: { disable: true } },
  disabled: { table: { disable: true } },
  round: { table: { disable: true } },
  active: { table: { disable: true } },
  inverted: { table: { disable: true } },
}
