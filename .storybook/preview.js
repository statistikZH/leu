/** @type { import('@storybook/web-components').Preview } */

import { setCustomElementsManifest } from "@storybook/web-components"
import customElemenents from "../dist/custom-elements.json"

setCustomElementsManifest(customElemenents)

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          ["Installation", "Usage", "Theme", "Contributing"],
          "Components",
          "*",
        ],
      },
    },
    viewport: {
      viewports: [
        {
          name: "Micro",
          styles: { width: "320px", height: "568px" },
          type: "mobile",
        },
        {
          name: "Small",
          styles: { width: "400px", height: "667px" },
          type: "mobile",
        },
        {
          name: "Regular",
          styles: { width: "600px", height: "667px" },
          type: "tablet",
        },
        {
          name: "Medium",
          styles: { width: "840px", height: "640px" },
          type: "desktop",
        },
        {
          name: "Large",
          styles: { width: "1024px", height: "768px" },
          type: "desktop",
        },
        {
          name: "Ultra",
          styles: { width: "1280px", height: "900px" },
          type: "desktop",
        },
      ],
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#fffffe" },
        { name: "light grey", value: "#f7f7f7" },
        { name: "blue", value: "#0076bd" },
        { name: "darkblue", value: "#00407c" },
        { name: "turquoise", value: "#00797b" },
        { name: "green", value: "#1a7f1f" },
        { name: "bordeaux", value: "#b01657" },
        { name: "magenta", value: "#d40053" },
        { name: "violet", value: "#7f3da7" },
        { name: "gray", value: "#666666" },
      ],
    },
    html: {
      root: "#root-inner",
      prettier: {
        tabWidth: 2,
        useTabs: false,
        removeComments: true,
      },
    },
  },
}

export default preview
