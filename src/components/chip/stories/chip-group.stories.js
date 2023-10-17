import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-chip-selectable.js"
import "../leu-chip-removable.js"
import "../leu-chip-link.js"
import "../leu-chip-group.js"

import { SELECTION_MODES } from "../ChipGroup.js"

export default {
  title: "Chip Group",
  component: "leu-chip-group",
  argTypes: {
    selectionMode: {
      control: "select",
      options: Object.values(SELECTION_MODES),
    },
  },
}

const chips = ["Chip 1", "Chip 2", "Chip 3"]

function Template(args) {
  return html`
    <div
      style="background: ${args.inverted
        ? "hsla(209, 83%, 59%, 1)"
        : "var(--leu-color-black-5)"}; padding: 1rem;"
    >
      <leu-chip-group selection-mode=${SELECTION_MODES.single}>
        ${chips.map(
          (chip) => html`
            <leu-chip-selectable ?inverted=${args.inverted} variant="radio">
              ${chip}
            </leu-chip-selectable>
          `
        )}
      </leu-chip-group>
    </div>
  `
}

export const Default = Template.bind({})
Default.args = {}
