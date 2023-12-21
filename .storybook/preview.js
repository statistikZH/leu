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
  },
}

export default preview
