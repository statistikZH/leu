import { html } from "lit"
import "../leu-menu.js"

export default {
  title: "Menu",
  component: "leu-menu",
}

function Template({}) {
  return html` <leu-menu /> `
}

export const Regular = Template.bind({})
