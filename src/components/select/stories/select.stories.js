import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import { LeuSelect } from "../leu-select.js"
import "../../menu/leu-menu.js"
import "../../menu/leu-menu-item.js"

import { MUNICIPALITIES } from "../test/fixtures.js"

export default {
  title: "Select",
  component: "leu-select",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-82208&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

const OPTIONS_EXAMPLES = [
  { label: "Option 1", value: "1" },
  "Option 2",
  "Option 3",
  "Sehr lange Option um zu schauen was passiert, wenn es zu lang wird.",
]

function Template({
  label,
  options,
  value,
  disabled = false,
  clearable = false,
  filterable = false,
  multiple = false,
  before,
  after,
}) {
  return html`
    <div style="margin-top: 50vh"></div>
    <leu-select
      class="dropdown"
      label=${ifDefined(label)}
      .value=${ifDefined(value)}
      ?clearable=${clearable}
      ?disabled=${disabled}
      ?filterable=${filterable}
      ?multiple=${multiple}
    >
      ${before ? html`<div slot="before">${before}</div>` : ""}
      ${after ? html`<div slot="after">${after}</div>` : ""}
      <leu-menu slot="menu">
        ${options.map(
          (option) => html`
            <leu-menu-item
              .value=${typeof option === "object" && option !== null
                ? option.value
                : option}
              .label=${LeuSelect.getOptionLabel(option)}
            >
              ${LeuSelect.getOptionLabel(option)}
            </leu-menu-item>
          `
        )}
      </leu-menu>
    </leu-select>
    <div style="margin-top: 50vh"></div>
  `
}

function TemplateSlots(args) {
  const before = html`<div>before</div>`
  const after = html`<div>after <input type="text"></input></div>`

  return Template({ ...args, before, after })
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Gemeinde",
  options: OPTIONS_EXAMPLES,
}
Regular.parameters = {
  docs: {
    description: {
      story: `To render a basic input field only the \`label\` attribute is required. The \`label\` is necessary for accessibility reasons.

        The label is also used inside \`aria-label\` of the clear button ("\${label} zurücksetzen"). Therefore, the label must not contain a verb like "Gemende auswählen". This would be confusing for screen reader users.
        `,
    },
  },
}

export const Filled = Template.bind({})
Filled.args = {
  label: "Gemeinde",
  options: OPTIONS_EXAMPLES,
  value: [OPTIONS_EXAMPLES[1]],
}

export const Clearable = Template.bind({})
Clearable.args = {
  label: "Gemeinde",
  options: OPTIONS_EXAMPLES,
  value: [OPTIONS_EXAMPLES[1]],
  clearable: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Gemeinde",
  options: OPTIONS_EXAMPLES,
  clearable: true,
  disabled: true,
}

export const DisabledFilled = Template.bind({})
DisabledFilled.args = {
  label: "Gemeinde",
  options: OPTIONS_EXAMPLES,
  value: [OPTIONS_EXAMPLES[1]],
  clearable: true,
  disabled: true,
}

export const Filterable = Template.bind({})
Filterable.args = {
  label: "Gemeinde",
  options: MUNICIPALITIES,
  clearable: true,
  disabled: false,
  filterable: true,
}

/* I also tried sloting the before and after. It doesn't work because the blur event is triggered everytime a slot is clicked */
export const BeforeAfterSlot = TemplateSlots.bind({})
BeforeAfterSlot.args = {
  label: "Gemeinde",
  options: MUNICIPALITIES,
  clearable: true,
  disabled: false,
  filterable: false,
  multiple: true,
}

export const Multiple = Template.bind({})
Multiple.args = {
  label: "Gemeinde",
  options: MUNICIPALITIES,
  clearable: true,
  disabled: false,
  filterable: true,
  multiple: true,
}

export const MultipleFilled = Template.bind({})
MultipleFilled.args = {
  label: "Gemeinde",
  options: MUNICIPALITIES,
  value: MUNICIPALITIES.slice(0, 2),
  clearable: true,
  disabled: false,
  filterable: true,
  multiple: true,
}
