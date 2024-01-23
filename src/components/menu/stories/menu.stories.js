import { html } from "lit"
import "../leu-menu.js"
import "../leu-menu-item.js"

export default {
  title: "Menu",
  component: "leu-menu",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-82208&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

function Template() {
  return html` <leu-menu>
    <leu-menu-item label="Menu Item 1" before="EMPTY"></leu-menu-item>
    <leu-menu-item label="Menu Item 2" before="check" active></leu-menu-item>
    <leu-menu-item label="Menu Item 3" before="EMPTY"></leu-menu-item>
    <hr />
    <leu-menu-item label="Menu Item 3" before="pin" after="CH"></leu-menu-item>
    <leu-menu-item label="Menu Item 4"></leu-menu-item>
  </leu-menu>`
}

export const Menu = Template.bind({})
