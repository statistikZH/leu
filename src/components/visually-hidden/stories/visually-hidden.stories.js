import { html } from "lit"
import "../leu-visually-hidden.js"

export default {
  title: "VisuallyHidden",
  component: "leu-visually-hidden",
  argTypes: {
    content: {
      control: "text",
    },
  },
}

function Template({ content }) {
  return html` <leu-visually-hidden>${content}</leu-visually-hidden>`
}

export const Regular = Template.bind({})
Regular.args = {
  content:
    "This is a text that isn't visible but still accessible for screenreaders.",
}
