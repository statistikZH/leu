import { html, nothing } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { classMap } from "lit/directives/class-map.js"
import "../leu-button.js"
import "../../icon/leu-icon.js"
import { paths as iconPaths } from "../../icon/paths.js"

const BUTTON_VARIANTS = ["primary", "secondary", "ghost"] as const
const BUTTON_SIZES = ["regular", "small"] as const
const BUTTON_TYPES = ["button", "submit", "reset"] as const
const BUTTON_EXPANDED_OPTIONS = ["true", "false"] as const

function copyContent(e) {
  navigator.clipboard.writeText(e.target.outerHTML.replace(/<!--.*?-->/g, ""))
}

export default {
  title: "Components/Button",
  component: "leu-button",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=4-1444&mode=design&t=xu5Vii8jXKKCKDez-0",
    },
    html: {
      root: "[data-root]",
    },
  },
}

function Template(args = {}) {
  const component = html`
    <div data-root>
      <leu-button
        content=${ifDefined(args.content)}
        size=${ifDefined(args.size)}
        variant=${ifDefined(args.variant)}
        type=${ifDefined(args.type)}
        expanded=${ifDefined(args.expanded)}
        ?round=${args.round}
        ?active=${args.active}
        ?inverted=${args.inverted}
        ?disabled=${args.disabled}
        ?fluid=${args.fluid}
        @click=${copyContent}
      >
        ${args.icon
          ? html`<leu-icon
              slot=${ifDefined(args.content ? args.iconPosition : undefined)}
              name=${args.icon}
            ></leu-icon>`
          : nothing}
        ${args.content}
      </leu-button>
    </div>
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
      style="${args.inverted
        ? "background:var(--leu-color-accent-blue); color: var(--leu-color-white-transp-90);"
        : ""}padding:40px;"
    >
      ${component}
    </div>
  `
}

export const Regular = Template.bind({})
Regular.argTypes = {
  content: { control: "text" },
  icon: { control: "select", options: Object.keys(iconPaths) },
  iconPosition: {
    control: "select",
    options: ["before", "after"],
  },
  type: { control: "radio", options: BUTTON_TYPES },
  size: { control: "radio", options: BUTTON_SIZES },
  variant: { control: "radio", options: BUTTON_VARIANTS },
  expanded: { control: "radio", options: BUTTON_EXPANDED_OPTIONS },
  disabled: { control: "boolean" },
  round: { control: "boolean" },
  active: { control: "boolean" },
  fluid: { control: "boolean" },
}
Regular.args = {
  content: "Click Mich...",
  round: false,
  disabled: false,
  active: false,
  inverted: false,
  fluid: false,

  icon: null,
  iconPosition: "before",
  size: null,
  variant: null,
  type: null,
}

const items = [
  { content: "Normal" },
  { content: "Active", active: true },
  { content: "Disabled", disabled: true },

  { content: "Normal", icon: "calendar", iconPosition: "before" },
  { content: "Active", icon: "calendar", iconPosition: "before", active: true },
  {
    content: "Disabled",
    icon: "calendar",
    iconPosition: "before",
    disabled: true,
  },

  { content: "Normal", icon: "calendar", iconPosition: "after" },
  { content: "Active", icon: "calendar", iconPosition: "after", active: true },
  {
    content: "Disabled",
    icon: "calendar",
    iconPosition: "after",
    disabled: true,
  },

  { icon: "calendar" },
  { icon: "calendar", active: true },
  { icon: "calendar", disabled: true },

  { icon: "calendar", round: true },
  { icon: "calendar", round: true, active: true },
  { icon: "calendar", round: true, disabled: true },
]

const ghostItems = [
  { content: "Normal", icon: "calendar", iconPosition: "before" },
  { content: "Active", icon: "calendar", iconPosition: "before", active: true },
  {
    content: "Disabled",
    icon: "calendar",
    iconPosition: "before",
    disabled: true,
  },

  {
    content: "Normal",
    icon: "calendar",
    iconPosition: "before",
    expanded: "closed",
  },
  {
    content: "Active",
    icon: "calendar",
    iconPosition: "before",
    active: true,
    expanded: "closed",
  },
  {
    content: "Disabled",
    icon: "calendar",
    iconPosition: "before",
    disabled: true,
    expanded: "closed",
  },

  { content: "Normal", icon: "calendar", iconPosition: "after" },
  { content: "Active", icon: "calendar", iconPosition: "after", active: true },
  {
    content: "Disabled",
    icon: "calendar",
    iconPosition: "after",
    disabled: true,
  },
]

const sizes = [
  {
    size: "regular",
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
    sizes: [{ size: "regular", items: ghostItems }],
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
    sizes: [{ size: "regular", items: ghostItems }],
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
      (group) => html`
        <h2>${group.variant + (group.inverted ? " + inverted" : "")}</h2>
        <div
          class=${classMap({
            "main-table": true,
            group: true,
            inverted: group.inverted,
          })}
        >
          ${group.sizes.map(
            (size) => html`
              <div>
                <div class=${classMap({ table: true })} data-root>
                  ${size.items.map(
                    (item) => html`
                      <leu-button
                        label=${ifDefined(item.label)}
                        size=${ifDefined(size.size)}
                        variant=${ifDefined(group.variant)}
                        expanded=${ifDefined(item.expanded)}
                        ?round=${item.round}
                        ?active=${item.active}
                        ?disabled=${item.disabled}
                        ?inverted=${group.inverted}
                        @click=${copyContent}
                      >
                        ${item.icon
                          ? html` <leu-icon
                              slot=${ifDefined(item.iconPosition)}
                              name=${item.icon}
                            ></leu-icon>`
                          : nothing}
                        ${item.content}
                      </leu-button>
                    `,
                  )}
                </div>
              </div>
            `,
          )}
        </div>
        <p>Click the button to copy the code to the clipboard</p>
      `,
    )}`
}

export const Overview = TemplateOverview.bind({})
Overview.argTypes = {
  content: { table: { disable: true } },
  icon: { table: { disable: true } },
  iconPosition: { table: { disable: true } },
  size: { table: { disable: true } },
  variant: { table: { disable: true } },
  type: { table: { disable: true } },
  disabled: { table: { disable: true } },
  round: { table: { disable: true } },
  active: { table: { disable: true } },
  inverted: { table: { disable: true } },
}
