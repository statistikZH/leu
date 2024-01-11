import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-menu-item.js"

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

function Template(args) {
  return html`
    <leu-menu-item
      before=${ifDefined(args.before)}
      after=${ifDefined(args.after)}
      ?active=${args.active}
      >${args.label}</leu-menu-item
    >
  `
}

export const Regular = Template.bind({})

export const Active = Template.bind({})
Active.args = {
  active: true,
}

export const IconBefore = Template.bind({})
IconBefore.args = {
  before: "check",
}

export const IconAfter = Template.bind({})
IconAfter.args = {
  after: "arrowRight",
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
