/** @type { import('@storybook/web-components').Preview } */

import {
  setCustomElements,
  setCustomElementsManifest,
} from "@web/storybook-prebuilt/web-components.js"
import customElemenents from "../custom-elements.json"

setCustomElementsManifest(customElemenents)

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
