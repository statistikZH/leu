import { Meta, StoryObj } from "@storybook/web-components"
import { html } from "lit"

import "../[namespace]-[name].js"
import {[Namespace][Name]} from "../[Name].js"

type StoryArgs = [Namespace][Name]
type Story = StoryObj<StoryArgs>

export default {
  title: "Components/[Name]",
  component: "[namespace]-[name]",
} satisfies Meta<StoryArgs>

const Template: Story = {
  render: ({}) => {
    return html` <[namespace]-[name]></[namespace]-[name]>`
  }
}

export const Regular = {
  ...Template,
  args: {
    // Add default args here
  }
}
