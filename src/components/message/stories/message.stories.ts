import { Meta, StoryObj } from "@storybook/web-components"
import { html, TemplateResult } from "lit"
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
    "--leu-message-accent-color": {
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

const baseRender =
  (messageContent: (args: StoryArgs) => TemplateResult) => (args: StoryArgs) =>
    html` <leu-message
      style="--leu-message-accent-color: ${args["--leu-message-accent-color"] ??
      "unset"};"
      type=${args.type}
      size=${args.size}
      ?removable=${args.removable}
      ?popup=${args.popup}
      @leu:remove=${args.onRemove}
    >
      ${messageContent(args)}
    </leu-message>`

const Template: Story = {
  render: baseRender(
    (args) =>
      html`<strong>Nachricht Titel</strong><br />
        Beschreibungstext einer Nachricht
        <leu-button
          slot="cta"
          variant="secondary"
          size="small"
          ?inverted=${args.type === "error" || args.type === "success"}
        >
          Rückgängig
        </leu-button>`,
  ),
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
  render: baseRender(
    () =>
      html`<strong>Nachricht Titel</strong><br />
        Beschreibungstext einer Nachricht`,
  ),
  args: {
    type: "info",
    size: "large",
  },
}

export const CustomColor = {
  ...Template,
  render: baseRender(
    () =>
      html`<strong>Entscheid wurde auf den 21.12.2024 verschoben</strong><br />
        Aufgrund ausstehender Abklärungen wurde der Termin verschoben.`,
  ),
  args: {
    type: "info",
    size: "large",
    "--message-accent-color": "#00797b",
  },
}

export const Small = {
  ...Template,
  render: baseRender(() => html`Nachricht ohne Titel`),
  args: {
    type: "success",
  },
}

export const Popup = {
  ...Small,
  args: {
    ...Small.args,
    popup: true,
  },
}
