import { fromRollup } from "@web/dev-server-rollup"
import rollupJson from "@rollup/plugin-json"
import { storybookPlugin } from "@web/dev-server-storybook"

const json = fromRollup(rollupJson)

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  watch: true,
  mimeTypes: {
    "**/custom-elements.json": "js",
  },
  plugins: [storybookPlugin({ type: "web-components" }), json()],
})
