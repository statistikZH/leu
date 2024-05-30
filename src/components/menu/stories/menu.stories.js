import { html } from "lit"
import "../leu-menu.js"
import "../leu-menu-item.js"
import "../../icon/leu-icon.js"
import { ifDefined } from "lit/directives/if-defined.js"

export default {
  title: "Menu",
  component: "leu-menu",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-82208&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
  argTypes: {
    selects: {
      control: "select",
      options: ["single", "multiple"],
    },
    role: {
      control: "select",
      options: ["menu", "listbox"],
    },
  },
}

function Template(args) {
  return html` <leu-menu
    role=${ifDefined(args.role)}
    selects=${ifDefined(args.selects)}
  >
    <leu-menu-item
      ><leu-icon slot="before"></leu-icon>Menu Item 1</leu-menu-item
    >
    <leu-menu-item active
      ><leu-icon slot="before" name="check"></leu-icon>Menu Item
      2</leu-menu-item
    >
    <leu-menu-item
      ><leu-icon slot="before"></leu-icon>Menu Item 3</leu-menu-item
    >
    <hr />
    <leu-menu-item
      ><leu-icon slot="before" name="pin"></leu-icon>Menu Item 3<span
        slot="after"
        >CH</span
      ></leu-menu-item
    >
    <leu-menu-item>Menu Item 4</leu-menu-item>
  </leu-menu>`
}

export const Menu = Template.bind({})
