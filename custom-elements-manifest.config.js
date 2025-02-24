import { customElementJetBrainsPlugin } from "custom-element-jet-brains-integration"
import { customElementVsCodePlugin } from "custom-element-vs-code-integration"
import { customElementVuejsPlugin } from "custom-element-vuejs-integration"

export default {
  globs: ["src/components/*/*.js"],
  exclude: ["src/**/test/**/*.js", "src/**/stories/**/*.js"],
  outdir: "./dist",
  /** Enable special handling for litelement */
  litelement: true,
  plugins: [
    // Generate custom VS Code data
    customElementVsCodePlugin({
      outdir: "./dist",
      cssFileName: null,
      referencesTemplate: (_, tag) => [
        {
          name: "Documentation",
          url: `https://statistikzh.github.io/leu/?path=/story/${tag.replace(
            "leu-",
            "",
          )}`,
        },
      ],
    }),

    customElementJetBrainsPlugin({
      outdir: "./dist",
      excludeCss: true,
      packageJson: false,
      referencesTemplate: (_, tag) => ({
        name: "Documentation",
        url: `https://statistikzh.github.io/leu/?path=/story/${tag.replace(
          "leu-",
          "",
        )}`,
      }),
    }),

    customElementVuejsPlugin({
      outdir: "./dist/vue",
      fileName: "index.d.ts",
      componentTypePath: (name) => `../${name.replace("Leu", "")}.js`,
    }),
  ],
}
