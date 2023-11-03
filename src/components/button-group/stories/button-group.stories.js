import { html } from "lit"
import "../leu-button-group.js"

// https://stackoverflow.com/questions/72566428/storybook-angular-how-to-dynamically-update-args-from-the-template
import { UPDATE_STORY_ARGS } from "@storybook/core-events" // eslint-disable-line
function updateStorybookArgss(id, args) {
  const channel = window.__STORYBOOK_ADDONS_CHANNEL__
  channel.emit(UPDATE_STORY_ARGS, {
    storyId: id,
    updatedArgs: args,
  })
}

export default {
  title: "ButtonGroup",
  component: "leu-button-group",
}

function Template({ items, selected }, { id }) {
  return html`
    <leu-button-group
      .items=${items}
      .selected=${selected}
      @click=${(event) => {
        updateStorybookArgss(id, {
          selected: event.target.selected,
        })
      }}
    >
    </leu-button-group>
    <br />
    <br />
    selected = '${selected}'
  `
}

export const Regular = Template.bind({})
Regular.args = {
  items: ["Eins", "Zwei", "Drei"],
  selected: "Zwei",
}
