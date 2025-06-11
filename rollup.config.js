import { globSync } from "glob"
import path from "path"
import { fileURLToPath } from "url"
import postcss from "rollup-plugin-postcss"
import postcssLit from "rollup-plugin-postcss-lit"
import { babel } from "@rollup/plugin-babel"
import replace from "@rollup/plugin-replace"
import typescript from "rollup-plugin-typescript2"
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
    // Select all files in a direct subdirectory of src/components
    // that have a name starting with
    // -  a capital letter
    // -  or "leu-"
    input: {
      index: "index.ts",
      ...Object.fromEntries(
        globSync("src/components/*/{[A-Z],leu-}*.ts", { nocase: false }).map(
          (file) => [
            path.basename(file, path.extname(file)),
            fileURLToPath(new URL(file, import.meta.url)),
          ],
        ),
      ),
    },
    output: {
      dir: "./dist/",
      format: "esm",
      entryFileNames: "[name].js",
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            emitDeclarationOnly: false,
            declaration: false,
          },
        },
      }),
      babel({ babelHelpers: "bundled" }),
      ...plugins.map((p) => p.plugin(...p.args)),
    ],
    external: [/^lit(\/.*\.js)?$/, "@floating-ui/dom"],
  },
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
