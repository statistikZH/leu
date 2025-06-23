import { html } from "lit"
import "../leu-icon.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { paths } from "../paths.js"

export default {
  title: "Components/Icon",
  component: "leu-icon",
  argTypes: {
    name: {
      control: "select",
      options: Object.keys(paths),
    },
    color: {
      control: {
        type: "color",
        presetColors: ["#009ee0", "#d93c1a", "#1a7f1f"],
      },
    },
  },
}

function Template({ name, size, color }) {
  return html` <leu-icon
    style="color: ${color}; ${size ? `--leu-icon-size: ${size}px` : ""};"
    name=${ifDefined(name)}
  ></leu-icon>`
}

export const Regular = Template.bind({})
Regular.args = {
  size: 24,
  name: "addNew",
}

export const Small = Template.bind({})
Small.args = {
  size: 16,
  name: "check",
}

export const Colored = Template.bind({})
Colored.args = {
  name: "smileyDevastated",
  size: 24,
  color: "#d93c1a",
}

export const Overview = {
  render: ({ color, size }) => html`
    <ul
      style="font-family: var(--leu-font-family-regular); color: var(--leu-color-black-60); list-style: none; margin: 0; padding: 0;"
    >
      ${Object.keys(paths).map(
        (name) =>
          html`<li
            style="display: flex; align-items: center; margin-bottom: 1rem; gap: 1rem;"
          >
            <leu-icon
              style="color: ${color}; ${size
                ? `--leu-icon-size: ${size}px`
                : ""};"
              name=${ifDefined(name)}
            ></leu-icon>
            ${name}
          </li>`,
      )}
    </ul>
  `,
  args: {
    size: 24,
    color: "#000000",
  },
}
