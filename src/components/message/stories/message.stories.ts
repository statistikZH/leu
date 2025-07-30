import { Meta, StoryObj } from "@storybook/web-components"
import { html } from "lit"
import { action } from "@storybook/addon-actions"

import "../leu-message.js"
import "../../button/leu-button.js"
import { LeuMessage } from "../Message.js"

type StoryArgs = LeuMessage
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/Message",
  component: "leu-message",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?node-id=316-4172&p=f&t=RVDlqNcmiHHiwE5P-11",
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["error", "success", "info", "warning"],
    },
    size: {
      control: "select",
      options: ["regular", "large"],
    },
    "--message-accent-color": {
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
        ],
      },
    },
  },
  args: {
    type: "success",
    size: "regular",
    removable: true,
    onRemove: action("leu:remove"),
  },
} satisfies Meta<StoryArgs>

const Template: Story = {
  render: (args) =>
    html` <leu-message
      style="--message-accent-color: ${args["--message-accent-color"] ??
      "unset"};"
      type=${args.type}
      size=${args.size}
      ?removable=${args.removable}
      @leu:remove=${args.onRemove}
    >
      <span slot="title">Nachricht Titel</span>
      Beschreibungstext einer Nachricht
      <leu-button
        slot="cta"
        variant="secondary"
        size="small"
        ?inverted=${args.type === "error" || args.type === "success"}
      >
        Rückgängig
      </leu-button>
    </leu-message>`,
}

export const Success = {
  ...Template,
  args: {
    type: "success",
    size: "large",
  },
}

export const Error = {
  ...Template,
  args: {
    type: "error",
    size: "large",
  },
}

export const Warning = {
  ...Template,
  args: {
    type: "warning",
    size: "large",
  },
}

export const Info = {
  ...Template,
  args: {
    type: "info",
    size: "large",
  },
}

export const CustomColor = {
  ...Template,
  args: {
    type: "info",
    size: "large",
    "--message-accent-color": "#00797b",
  },
}

export const Small = {
  ...Template,
  args: {
    type: "success",
  },
}
