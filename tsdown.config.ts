import path from "path"
import { defineConfig } from "tsdown"
import { globSync } from "glob"
import postcssLit from "rollup-plugin-postcss-lit"

export const commonConfig = {
  plugins: [postcssLit()],
  define: {
    __LEU_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
}

export default defineConfig({
  entry: {
    index: "src/index.ts",
    ...Object.fromEntries(
      globSync("src/components/*/{[A-Z],leu-}*.ts", { nocase: false }).map(
        (file) => [path.basename(file, path.extname(file)), file],
      ),
    ),
  },
  format: "esm",
  outDir: "dist",
  dts: true,
  clean: true,
  platform: "browser",
  deps: {
    skipNodeModulesBundle: true,
  },
  define: commonConfig.define,
  css: {
    transformer: "postcss",
  },
  plugins: commonConfig.plugins,
})
