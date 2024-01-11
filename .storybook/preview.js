/** @type { import('@storybook/web-components').Preview } */

import { setCustomElementsManifest } from "@storybook/web-components"
import customElemenents from "../custom-elements.json"

setCustomElementsManifest(customElemenents)

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
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
  },
}

export default preview
