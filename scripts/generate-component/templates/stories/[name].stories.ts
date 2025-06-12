import { html } from "lit"
import "../[namespace]-[name].js"

export default {
  title: "Components/[Name]",
  component: "[namespace]-[name]",
}

function Template({}) {
  return html` <[namespace]-[name] /> `
}

export const Regular = Template.bind({})
