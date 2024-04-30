import { html } from "lit"

import "../leu-chip-selectable.js"
import "../leu-chip-removable.js"
import "../leu-chip-group.js"

import { SELECTION_MODES } from "../ChipGroup.js"
import { VARIANTS as SELECTABLE_VARIANTS } from "../ChipSelectable.js"

export default {
  title: "Chip/Group",
  component: "leu-chip-group",
  argTypes: {
    selectionMode: {
      control: "select",
      options: Object.values(SELECTION_MODES),
    },
    inverted: { control: "boolean" },
  },
  args: {
    selectionMode: "",
    inverted: false,
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17340-81933&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
    html: {
      root: "[data-root]",
    },
  },
}

const chips = [
  "Chip mit einem sehr langen Text der dann hoffentlich mal abgeschnitten wird",
  "Chip 2",
  "Chip 3",
]

function invertedBackground(args, content) {
  return html`
    <div
      style="background: ${args.inverted
        ? "hsla(209, 83%, 59%, 1)"
        : "var(--leu-color-black-5)"}; padding: 1rem;"
      data-root
    >
      ${content}
    </div>
  `
}

function DefaultTemplate(args) {
  const content = html`
    <leu-chip-group selection-mode=${args.selectionMode}>
      ${chips.map(
        (chip) => html`
          <leu-chip-removable ?inverted=${args.inverted} label=${chip}>
          </leu-chip-removable>
        `
      )}
    </leu-chip-group>
  `

  return invertedBackground(args, content)
}

function SingleTemplate(args) {
  const content = html`
    <leu-chip-group selection-mode=${args.selectionMode}>
      ${chips.map(
        (chip) => html`
          <leu-chip-selectable
            ?inverted=${args.inverted}
            variant=${SELECTABLE_VARIANTS.radio}
            value="chip-${chip}"
            label=${chip}
          >
          </leu-chip-selectable>
        `
      )}
    </leu-chip-group>
  `

  return invertedBackground(args, content)
}

function MultipleTemplate(args) {
  const content = html`
    <leu-chip-group selection-mode=${args.selectionMode}>
      ${chips.map(
        (chip) => html`
          <leu-chip-selectable
            ?inverted=${args.inverted}
            value="chip-${chip}"
            label=${chip}
          >
          </leu-chip-selectable>
        `
      )}
    </leu-chip-group>
  `

  return invertedBackground(args, content)
}

export const Default = DefaultTemplate.bind({})
Default.args = {}

export const Single = SingleTemplate.bind({})
Single.args = { selectionMode: SELECTION_MODES.single }

export const Multiple = MultipleTemplate.bind({})
Multiple.args = { selectionMode: SELECTION_MODES.multiple }
