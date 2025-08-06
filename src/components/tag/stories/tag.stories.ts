import { Meta, StoryObj } from "@storybook/web-components"
import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-tag.js"
import "../../icon/leu-icon.js"
import { LeuTag } from "../Tag.js"

import { paths as iconPaths } from "../../icon/paths.js"

type StoryArgs = LeuTag
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/Tag",
  component: "leu-tag",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?node-id=21161-184432&t=QMYWpoD4FMWFrUkK-11",
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    "--leu-tag-accent-color": {
      control: {
        type: "color",
        presetColors: [
          "#0076bd",
          "#00407c",
          "#00797b",
          "#1a7f1f",
          "#b01657",
          "#d40053",
          "#7f3da7",
          "#666666",
          "#009ee0",
          "#d93c1a",
          "#1a7f1f",
        ],
      },
    },
    icon: { control: "select", options: Object.keys(iconPaths) },
  },
  args: {
    variant: "solid",
    icon: "confirm",
    default: "Abgeschlossen",
    "--leu-tag-accent-color": "#7f3da7",
  },
} satisfies Meta<StoryArgs>

const Template: Story = {
  render: (args: StoryArgs) =>
    html` <leu-tag
      variant=${ifDefined(args.variant)}
      style="--leu-tag-accent-color: ${args["--leu-tag-accent-color"] ??
      "unset"}"
    >
      ${args.icon
        ? html`<leu-icon slot="icon" name=${args.icon}></leu-icon>`
        : ""}
      ${args.default}</leu-tag
    >`,
}

export const Solid = {
  ...Template,
  args: {
    variant: "solid",
  },
}

export const Outline = {
  ...Template,
  args: {
    variant: "outline",
  },
}

export const Ghost = {
  ...Template,
  args: {
    variant: "ghost",
  },
}

export const Warning = {
  ...Template,
  args: {
    variant: "solid",
    "--leu-tag-accent-color": "#d93c1a",
    default: "Abgelaufen",
  },
}

export const NoIcon = {
  ...Template,
  args: {
    variant: "solid",
    "--leu-tag-accent-color": "#7f3da7",
    icon: undefined,
  },
}
