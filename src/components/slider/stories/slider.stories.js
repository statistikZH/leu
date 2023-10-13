import { html } from "lit"
import "../leu-slider.js"

export default {
  title: "slider",
  component: "leu-slider",
}

function Template({ label, disabled, min, max, value }) {
  return html`
    <leu-slider
      id="slider-default"
      .label=${label}
      ?disabled=${disabled}
      .min=${min}
      .max=${max}
      .value=${value}
    >
    </leu-slider>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: null,
  min: 0,
  max: 100,
  value: 20,
}

export const Labeled = Template.bind({})
Labeled.args = {
  label: "Wert auswählen",
  min: 100000,
  max: 200000,
  value: 150000,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Wert auswählen",
  min: 0,
  max: 100,
  value: 20,
  disabled: true,
}
