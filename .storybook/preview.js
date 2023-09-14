/** @type { import('@storybook/web-components').Preview } */
import { setCustomElementsManifest } from "@storybook/web-components"
import customElements from "../custom-elements.json"

import "../src/styles/theme.css"

setCustomElementsManifest(customElements)

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
