import { fromRollup } from "@web/dev-server-rollup"
import rollupJson from "@rollup/plugin-json"
import { storybookPlugin } from "@web/dev-server-storybook"

import rollupPostcss from "rollup-plugin-postcss"
import rollupPpostcssLit from "rollup-plugin-postcss-lit"

const postcss = fromRollup(rollupPostcss)
const postcssLit = fromRollup(rollupPpostcssLit)

const json = fromRollup(rollupJson)

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  nodeResolve: true,
  watch: true,
  mimeTypes: {
    "**/custom-elements.json": "js",
    "src/components/**/*.css": "js",
  },
  plugins: [
    storybookPlugin({ type: "web-components" }),
    postcss({
      inject: false,
    }),
    postcssLit(),
    json(),
  ],
})
