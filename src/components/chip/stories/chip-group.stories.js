import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"
import { styleMap } from "lit/directives/style-map.js"

import "../leu-chip-selectable.js"
import "../leu-chip-removable.js"
import "../leu-chip-link.js"
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
    headingLevel: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
    },
    "--leu-chip-group-gap": {
      control: "text",
    },
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

const links = [
  "Steuererklärung",
  "Abstimmungen",
  "Zentrale Aufnahmeprüfung",
  "Pass & Identitätskarte",
  "Arbeiten beim Kanton",
]

function invertedBackground({ args, content }) {
  return {
    content: html`
      <div
        style="background: ${args.inverted
          ? "hsla(209, 83%, 59%, 1)"
          : "var(--leu-color-black-5)"}; padding: 1rem;"
        data-root
      >
        ${content}
      </div>
    `,
    args,
  }
}

function chipGroup({ args, content }) {
  const styles = {
    "--leu-chip-group-gap": args["--leu-chip-group-gap"],
  }

  const nextContent = html`
    <leu-chip-group
      style=${styleMap(styles)}
      selection-mode=${ifDefined(args.selectionMode)}
      heading-level=${ifDefined(args.headingLevel)}
      label=${ifDefined(args.label)}
      ?inverted=${args.inverted}
    >
      ${content}
    </leu-chip-group>
  `

  return { args, content: nextContent }
}

function DefaultTemplate(args) {
  const content = html`
    ${chips.map(
      (chip) => html`
        <leu-chip-removable ?inverted=${args.inverted}>
          ${chip}
        </leu-chip-removable>
      `,
    )}
  `

  return invertedBackground(chipGroup({ args, content })).content
}

function SingleTemplate(args) {
  const content = html`
    ${chips.map(
      (chip) => html`
        <leu-chip-selectable
          ?inverted=${args.inverted}
          variant=${SELECTABLE_VARIANTS.radio}
          value="chip-${chip}"
        >
          ${chip}
        </leu-chip-selectable>
      `,
    )}
  `

  return invertedBackground(chipGroup({ args, content })).content
}

function MultipleTemplate(args) {
  const content = html`
    ${chips.map(
      (chip) => html`
        <leu-chip-selectable ?inverted=${args.inverted} value="chip-${chip}">
          ${chip}
        </leu-chip-selectable>
      `,
    )}
  `

  return invertedBackground(chipGroup({ args, content })).content
}

function LabeledTemplate(args) {
  const content = html`
    ${links.map(
      (chip) => html`
        <leu-chip-link ?inverted=${args.inverted}> ${chip} </leu-chip-link>
      `,
    )}
  `

  return invertedBackground(chipGroup({ args, content })).content
}

export const Default = DefaultTemplate.bind({})
Default.args = {}

export const Single = SingleTemplate.bind({})
Single.args = { selectionMode: SELECTION_MODES.single }

export const Multiple = MultipleTemplate.bind({})
Multiple.args = { selectionMode: SELECTION_MODES.multiple }

export const Labeled = LabeledTemplate.bind({})
Labeled.args = { label: "Top Themen" }
