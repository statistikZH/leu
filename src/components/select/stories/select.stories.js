import { html } from "lit"
import "../leu-select.js"

export default {
  title: "select",
  component: "leu-select",
}

function Template({
  label,
  options,
  value = null,
  disabled = false,
  clearable = false,
}) {
  return html`
    <leu-select
      class="dropdown"
      options=${options}
      label=${label}
      value=${value}
      ?clearable=${clearable}
      ?disabled=${disabled}
    >
    </leu-select>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: "",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Sehr lange Option um zu schauen was passiert, wenn es zu lang wird."]',
  // value: "Option 2"
}

export const Labeled = Template.bind({})
Labeled.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Sehr lange Option um zu schauen was passiert, wenn es zu lang wird."]',
  // value: "Option 2"
}

export const Filled = Template.bind({})
Filled.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Option 4"]',
  value: "Option 2",
}

export const Clearable = Template.bind({})
Clearable.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Option 4"]',
  value: "Option 2",
  clearable: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Option 4"]',
  value: "",
  clearable: true,
  disabled: true,
}

export const DisabledFilled = Template.bind({})
DisabledFilled.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Option 4"]',
  value: "Option 2",
  clearable: true,
  disabled: true,
}
