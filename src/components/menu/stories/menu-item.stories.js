import { html, nothing } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-menu-item.js"
import "../../icon/leu-icon.js"
import { paths as iconPaths } from "../../icon/paths.js"

function isIcon(name) {
  return name === "EMPTY" || Object.keys(iconPaths).includes(name)
}

export default {
  title: "Menu/Item",
  component: "leu-menu-item",
  args: {
    label: "Menu Item",
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-82208&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

/* eslint-disable no-nested-ternary */
function Template(args) {
  return html`
    <leu-menu-item
      href=${ifDefined(args.href)}
      ?active=${args.active}
      ?disabled=${args.disabled}
      ?multipleSelection=${args.multipleSelection}
    >
      ${args.before
        ? isIcon(args.before)
          ? html`<leu-icon slot="before" name=${args.before}></leu-icon>`
          : html`<span slot="before">${args.before}</span>`
        : nothing}
      ${args.label}
      ${args.after
        ? isIcon(args.after)
          ? html`<leu-icon slot="after" name=${args.after}></leu-icon>`
          : html`<span slot="after">${args.after}</span>`
        : null}
    </leu-menu-item>
  `
}
/* eslint-enable no-nested-ternary */

export const Regular = Template.bind({})

export const Active = Template.bind({})
Active.args = {
  active: true,
}

export const IconBefore = Template.bind({})
IconBefore.args = {
  before: "download",
}

export const IconAfterLink = Template.bind({})
IconAfterLink.args = {
  after: "arrowRight",
  href: "https://www.zh.ch",
}

export const IconAndTextLabel = Template.bind({})
IconAndTextLabel.args = {
  before: "pin",
  after: "CH",
}

export const IconPlaceholder = Template.bind({})
IconPlaceholder.args = {
  before: "EMPTY",
}

export const MultipleSelection = Template.bind({})
MultipleSelection.args = {
  multipleSelection: true,
}
