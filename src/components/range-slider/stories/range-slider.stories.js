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
  minDisabled,
  maxDisabled,
  value,
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
      ?minDisabled=${ifDefined(minDisabled)}
      ?maxDisabled=${ifDefined(maxDisabled)}
      .min=${min}
      .max=${max}
      value=${value}
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
  value: "15, 30",
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

export const MinDisabled = Template.bind({})
MinDisabled.args = {
  label: "Wert auswählen",
  min: 0,
  max: 100,
  fromValue: 20,
  toValue: 50,
  disabled: false,
  minDisabled: true,
}

export const MaxDisabled = Template.bind({})
MaxDisabled.args = {
  label: "Wert auswählen",
  min: 0,
  max: 100,
  fromValue: 20,
  toValue: 50,
  disabled: false,
  maxDisabled: true,
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

export const Dates = Template.bind({})
Dates.args = {
  label: "Wert auswählen",
  min: new Date("2010.01.01").getTime(),
  max: new Date("2014.01.01").getTime(),
  fromValue: new Date("2013.01.01").getTime(),
  toValue: new Date("2013.02.01").getTime(),
  labelsFormat: {
    locale: "de-CH",
    options: {
      style: "date",
      unit: "day",
    },
  },
}

export const Months = Template.bind({})
Months.args = {
  label: "Wert auswählen",
  min: new Date(Date.UTC(2020, 1 - 1, 15)).getTime(),
  max: new Date(Date.UTC(2024, 3 - 1, 15)).getTime(),
  fromValue: new Date(Date.UTC(2023, 1 - 1, 15)).getTime(),
  toValue: new Date(Date.UTC(2024, 3 - 1, 15)).getTime(),
  labelsFormat: {
    locale: "de-CH",
    options: {
      style: "date",
      unit: "month",
    },
  },
  step: (86400000 * 365) / 12,
}
