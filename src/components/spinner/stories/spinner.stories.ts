import { html } from "lit"
import "../leu-spinner.js"
import { styleMap } from "lit/directives/style-map.js"

export default {
  title: "Components/Spinner",
  component: "leu-spinner",
  argTypes: {
    color: {
      control: {
        type: "color",
        presetColors: ["#009ee0", "#d93c1a", "#1a7f1f"],
      },
    },
  },
}

function Template({ size, color }) {
  const styles = styleMap({
    color,
    "--leu-spinner-size": size ? `${size}px` : null,
  })
  return html` <leu-spinner style=${styles}></leu-spinner> `
}

export const Regular = Template.bind({})
Regular.args = {
  size: 56,
}
