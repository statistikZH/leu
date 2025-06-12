import { html } from "lit"
import { action } from "@storybook/addon-actions"

import "../leu-pagination.js"

// https://stackoverflow.com/questions/72566428/storybook-angular-how-to-dynamically-update-args-from-the-template
import { UPDATE_STORY_ARGS } from "@storybook/core-events" // eslint-disable-line
import { ifDefined } from "lit/directives/if-defined.js"

function updateStorybookArgss(id, args) {
  const channel = window.__STORYBOOK_ADDONS_CHANNEL__
  channel.emit(UPDATE_STORY_ARGS, {
    storyId: id,
    updatedArgs: args,
  })
}

const items = [
  { id: 1, label: "Ananas", value: 7 },
  { id: 2, label: "Apfel", value: 12 },
  { id: 3, label: "Aprikose", value: 3 },
  { id: 4, label: "Banare", value: 11 },
  { id: 5, label: "Birne", value: 10 },
  { id: 6, label: "Brombeere", value: 5 },
  { id: 7, label: "Cranberries", value: 3 },
  { id: 8, label: "Datteln", value: 2 },
  { id: 9, label: "Erdbeere", value: 0 },
  { id: 10, label: "Feige", value: 11 },
  { id: 11, label: "Granatapfel", value: 14 },
  { id: 12, label: "Grapefruit", value: 7 },
  { id: 13, label: "Heidelbeere", value: 12 },
  { id: 14, label: "Himbeere", value: 3 },
  { id: 15, label: "Johannisbeere", value: 11 },
  { id: 16, label: "Kirsche", value: 10 },
  { id: 17, label: "Kiwi", value: 5 },
  { id: 18, label: "Limette", value: 3 },
  { id: 19, label: "Litschi", value: 2 },
  { id: 20, label: "Mandarine", value: 0 },
  { id: 21, label: "Mango", value: 11 },
  { id: 22, label: "Melone", value: 14 },
  { id: 23, label: "Mirabelle", value: 14 },
  { id: 24, label: "Nashi", value: 12 },
  { id: 25, label: "Orange", value: 3 },
  { id: 26, label: "Papaya", value: 6 },
  { id: 27, label: "Pfirsich", value: 5 },
  { id: 28, label: "Pflaume", value: 17 },
  { id: 29, label: "Physalis", value: 1 },
  { id: 30, label: "Preiselbeere", value: 19 },
  { id: 31, label: "Pomelo", value: 12 },
  { id: 32, label: "Quitte", value: 0 },
  { id: 33, label: "Rhabarber", value: 1 },
  { id: 34, label: "Sanddorn", value: 2 },
  { id: 35, label: "Stachelbeere", value: 19 },
  { id: 36, label: "Ugli", value: 9 },
  { id: 37, label: "Weintraube", value: 11 },
  { id: 38, label: "Zitrone", value: 4 },
  { id: 39, label: "Zwetschge", value: 20 },
]

export default {
  title: "Components/Pagination",
  component: "leu-pagination",
  args: {
    onPageChange: action("leu:pagechange"),
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17341-82468&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

function Template(
  { startIndex, endIndex, onPageChange, itemsPerPage, defaultPage },
  { id },
) {
  return html`
    ${items
      .slice(startIndex, endIndex)
      .map((item) => html`<div>${item.label}</div>`)}
    <leu-pagination
      numOfItems=${items.length}
      itemsPerPage=${ifDefined(itemsPerPage)}
      defaultPage=${ifDefined(defaultPage)}
      @leu:pagechange=${(e) => {
        onPageChange(e)
        updateStorybookArgss(id, {
          startIndex: e.detail.startIndex,
          endIndex: e.detail.endIndex,
        })
      }}
    >
    </leu-pagination>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  startIndex: 0,
  endIndex: 5,
  itemsPerPage: 5,
  // defaultPage: 2,
}
