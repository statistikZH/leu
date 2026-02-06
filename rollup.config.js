import { globSync } from "glob"
import path from "path"
import { fileURLToPath } from "url"
import postcss from "rollup-plugin-postcss"
import postcssLit from "rollup-plugin-postcss-lit"
import replace from "@rollup/plugin-replace"
import { dts } from "rollup-plugin-dts"

export const plugins = [
  {
    plugin: replace,
    args: [
      {
        preventAssignment: true,
        values: {
          __LEU_VERSION__: JSON.stringify(process.env.npm_package_version),
        },
      },
    ],
  },
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
export default [
  {
    input: {
      ...Object.fromEntries(
        globSync("dist/components/*/{[A-Z],leu-}*.d.ts", { nocase: false }).map(
          (file) => [
            path.basename(file, ".d.ts"),
            fileURLToPath(new URL(file, import.meta.url)),
          ],
        ),
      ),
    },
    output: {
      dir: "./dist/",
    },
    plugins: [dts()],
  },
]
