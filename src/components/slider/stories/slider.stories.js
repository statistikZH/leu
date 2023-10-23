import { html } from "lit"
import "../leu-slider.js"

export default {
  title: "Slider",
  component: "leu-slider",
}

function Template({
  label,
  disabled,
  min,
  max,
  value,
  step,
  labelsArray,
  labelsFormat,
}) {
  return html`
    <leu-slider
      id="slider-default"
      .label=${label}
      ?disabled=${disabled}
      .min=${min}
      .max=${max}
      .value=${value}
      .step=${step}
      .labelsArray=${labelsArray}
      .labelsFormat=${labelsFormat}
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

export const LabeledValues = Template.bind({})
LabeledValues.args = {
  label: "Wert auswählen",
  // min: 0,
  // max: 100,
  value: 0,
  disabled: false,
  labelsArray: [2011, 2012, 2015, 2022],
}

export const FormatedValues = Template.bind({})
FormatedValues.args = {
  label: "Wert auswählen",
  min: 100000,
  max: 200000,
  value: 150000,
  labelsFormat: {
    locale: "de-CH",
    options: {
      style: "currency",
      currency: "CHF",
      maximumFractionDigits: 0,
    },
  },
}

export const Step = Template.bind({})
Step.args = {
  label: null,
  min: 0,
  max: 100,
  value: 20,
  step: 0.1,
}
