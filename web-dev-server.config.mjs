import { fromRollup } from "@web/dev-server-rollup"
import rollupJson from "@rollup/plugin-json"
import { esbuildPlugin } from "@web/dev-server-esbuild"
import { fileURLToPath } from "node:url"

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
  plugins: [
    esbuildPlugin({
      ts: true,
      target: "auto",
      tsconfig: fileURLToPath(new URL("./tsconfig.json", import.meta.url)),
    }),
    ...plugins,
    json(),
  ],
})
