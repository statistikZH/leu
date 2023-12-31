import { html } from "lit"
import "../leu-dropdown.js"

export default {
  title: "Dropdown",
  component: "leu-dropdown",
}

function Template({ label, expanded }) {
  return html` <leu-dropdown label=${label} ?expanded=${expanded}>
    <leu-menu>
      <leu-menu-item>Als CSV Tabelle</leu-menu-item>
      <leu-menu-item>Als XLS Tabelle</leu-menu-item>
      <hr />
      <leu-menu-item>Als PNG exportieren</leu-menu-item>
      <leu-menu-item>Als SVG exportieren</leu-menu-item>
      <leu-menu-item>Als PDF exportieren</leu-menu-item>
    </leu-menu>
  </leu-dropdown>`
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Download",
}
