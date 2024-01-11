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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=18180-165796&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

function Template({ items, value }, { id }) {
  return html`
    <leu-button-group
      .items=${items}
      .value=${value}
      @click=${(event) => {
        updateStorybookArgss(id, {
          value: event.target.value,
        })
      }}
    >
    </leu-button-group>
    <br />
    <br />
    <pre>value = '${value}'</pre>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  items: ["Eins", "Zwei", "Drei"],
  value: "Zwei",
}
