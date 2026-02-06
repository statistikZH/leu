import { defineConfig } from "vite"
import path from "path"
import { globSync } from "glob"
import postcssLit from "rollup-plugin-postcss-lit"
import replace from "@rollup/plugin-replace"
import { fileURLToPath } from "url"

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        index: "src/index.ts",
        ...Object.fromEntries(
          globSync("src/components/*/{[A-Z],leu-}*.ts", { nocase: false }).map(
            (file) => [
              path.basename(file, path.extname(file)),
              fileURLToPath(new URL(file, import.meta.url)),
            ],
          ),
        ),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [/^lit(\/.*\.js)?$/, "@floating-ui/dom"],
    },
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        __LEU_VERSION__: JSON.stringify(process.env.npm_package_version),
      },
    }),
    postcssLit(),
  ],
})
