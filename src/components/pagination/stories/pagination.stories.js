import { html } from "lit"
import "../leu-pagination.js"

export default {
  title: "Pagination",
  component: "leu-pagination",
}

function Template() {
  return html` <leu-pagination> </leu-pagination> `
}

export const Regular = Template.bind({})
