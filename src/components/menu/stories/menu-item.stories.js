import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-menu-item.js"

export default {
  title: "Menu/Item",
  component: "leu-menu-item",
  args: {
    label: "Menu Item",
  },
}

function Template(args) {
  return html`
    <leu-menu-item
      before=${ifDefined(args.before)}
      after=${ifDefined(args.after)}
      ?selected=${args.selected}
      >${args.label}</leu-menu-item
    >
  `
}

export const Regular = Template.bind({})

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
