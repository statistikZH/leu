import { html } from "lit"
import "../../../exports/define/button.js"

export default {
  title: "Button",
  component: "leu-button",
}

function Template({ label, round, disabled, icon }) {
  return html`
    <leu-button
      .label="${label}"
      ?round="${round}"
      ?disabled=${disabled}
      .icon=${icon}
    >
    </leu-button>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Click Mich",
}

export const Icon = Template.bind({})
Icon.args = {
  icon: "edit",
}

export const IconRound = Template.bind({})
IconRound.args = {
  icon: "edit",
  round: true,
}

export const IconBefore = Template.bind({})
IconBefore.args = {
  icon: "edit",
  label: "Click Mich",
}
