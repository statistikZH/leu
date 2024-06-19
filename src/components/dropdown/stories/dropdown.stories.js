import { html, nothing } from "lit"
import "../leu-dropdown.js"
import "../../icon/leu-icon.js"

import { paths as iconPaths } from "../../icon/paths.js"

/**
 * @type {import("@storybook/web-components").Meta}
 */
export default {
  title: "Dropdown",
  component: "leu-dropdown",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=136815-217650&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
  argTypes: {
    icon: {
      control: "select",
      options: Object.keys(iconPaths),
    },
  },
}

function Template({ label, expanded, icon }) {
  return html` <leu-dropdown label=${label} ?expanded=${expanded}>
    ${icon ? html`<leu-icon name=${icon} slot="icon"></leu-icon>` : nothing}
    <leu-menu>
      <leu-menu-item
        href="https://www.web.statistik.zh.ch/ogd/daten/ressourcen/KTZH_00001120_00002165.csv"
        >OGD Ressource</leu-menu-item
      >
      <leu-menu-item>Als CSV Tabelle</leu-menu-item>
      <leu-menu-item>Als XLS Tabelle</leu-menu-item>
      <hr />
      <leu-menu-item>Als PNG exportieren</leu-menu-item>
      <leu-menu-item>Als SVG exportieren</leu-menu-item>
      <leu-menu-item disabled>Als PDF exportieren</leu-menu-item>
    </leu-menu>
  </leu-dropdown>`
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Download",
  icon: "download",
}

export const WithoutIcon = Template.bind({})
WithoutIcon.args = {
  label: "Download",
}
