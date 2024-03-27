import { globSync } from "glob"
import path from "path"
import { fileURLToPath } from "url"
import postcss from "rollup-plugin-postcss"
import postcssLit from "rollup-plugin-postcss-lit"
import { babel } from "@rollup/plugin-babel"

export const plugins = [
  {
    plugin: postcss,
    args: [
      {
        inject: false,
      },
    ],
  },
  {
    plugin: postcssLit,
    args: [],
  },
]

/**
 * @type {import("rollup").RollupOptions}
 */
export default {
  // Select all files in a direct subdirectory of src/components
  // that have a name starting with
  // -  a capital letter
  // -  or "leu-"
  input: {
    "index.js": "index.js",
    ...Object.fromEntries(
      globSync("src/components/*/{[A-Z],leu-}*.js", { nocase: false }).map(
        (file) => [
          path.basename(file, path.extname(file)),
          fileURLToPath(new URL(file, import.meta.url)),
        ]
      )
    ),
  },
  output: {
    dir: "./dist/",
    format: "esm",
    entryFileNames: "[name].js",
  },
  plugins: [
    babel({ babelHelpers: "bundled" }),
    ...plugins.map((p) => p.plugin(...p.args)),
  ],
  external: /^lit(\/.*\.js)?$/,
}
