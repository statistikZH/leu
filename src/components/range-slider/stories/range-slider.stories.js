import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-range-slider.js"

export default {
  title: "Range-Slider",
  component: "leu-range-slider",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-81936&mode=design",
    },
  },
}

function Template({
  label,
  disabled,
  min,
  max,
  fromValue,
  toValue,
  step,
  labelsArray,
  labelsFormat,
}) {
  return html`
    <leu-range-slider
      id="slider-default"
      .label=${ifDefined(label)}
      ?disabled=${ifDefined(disabled)}
      .min=${min}
      .max=${max}
      .fromValue=${fromValue}
      .toValue=${toValue}
      .step=${step}
      .labelsArray=${labelsArray}
      .labelsFormat=${labelsFormat}
    >
    </leu-range-slider>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: null,
  min: 0,
  max: 100,
  fromValue: 20,
  toValue: 100,
}

export const Labeled = Template.bind({})
Labeled.args = {
  label: "Wert auswählen",
  min: 100000,
  max: 200000,
  fromValue: 150000,
  toValue: 180000,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Wert auswählen",
  min: 0,
  max: 100,
  fromValue: 20,
  toValue: 50,
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
  fromValue: 150000,
  toValue: 180000,
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
  fromValue: 20,
  toValue: 50,
  step: 0.1,
}
