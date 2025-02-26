import { fromRollup } from "@web/dev-server-rollup"
import rollupJson from "@rollup/plugin-json"

import { plugins as rollupPlugins } from "./rollup.config.js"

export const plugins = rollupPlugins.map((p) => fromRollup(p.plugin)(...p.args))

const json = fromRollup(rollupJson)

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  watch: true,
  mimeTypes: {
    "**/custom-elements.json": "js",
    "src/components/**/*.css": "js",
    ".storybook/static/*.css": "js",
    "src/styles/common-styles.css": "js",
  },
  plugins: [...plugins, json()],
})
