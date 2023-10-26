import { html } from "lit"
import "../leu-menu.js"
import "../leu-menu-item.js"

export default {
  title: "Menu",
  component: "leu-menu",
}

function Template() {
  return html` <leu-menu>
    <leu-menu-item>Menu Item 1</leu-menu-item>
    <leu-menu-item before="check" active>Menu Item 2</leu-menu-item>
    <leu-menu-item>Menu Item 3</leu-menu-item>
    <hr />
    <leu-menu-item before="pin" after="CH">Menu Item 3</leu-menu-item>
    <leu-menu-item>Menu Item 4</leu-menu-item>
  </leu-menu>`
}

export const Regular = Template.bind({})
