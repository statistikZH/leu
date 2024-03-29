import { html } from "lit"
import "../leu-dropdown.js"

export default {
  title: "Dropdown",
  component: "leu-dropdown",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=136815-217650&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

function Template({ label, expanded }) {
  return html` <leu-dropdown label=${label} ?expanded=${expanded}>
    <leu-menu>
      <leu-menu-item label="Als CSV Tabelle"></leu-menu-item>
      <leu-menu-item label="Als XLS Tabelle"></leu-menu-item>
      <hr />
      <leu-menu-item label="Als PNG exportieren"></leu-menu-item>
      <leu-menu-item label="Als SVG exportieren"></leu-menu-item>
      <leu-menu-item label="Als PDF exportieren" disabled></leu-menu-item>
    </leu-menu>
  </leu-dropdown>`
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Download",
}
