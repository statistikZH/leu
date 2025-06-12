import rollupJson from "@rollup/plugin-json"
import rollupCommonjs from "@rollup/plugin-commonjs"
import { StorybookConfig } from "@web/storybook-framework-web-components"

import { plugins as rollupPlugins } from "../rollup.config.js"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-designs",
    "@whitespace/storybook-addon-html",
    "@storybook/addon-a11y",
  ],
  staticDirs: ["static"],
  framework: {
    name: "@web/storybook-framework-web-components",
  },
  docs: {},
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
  previewHead: (head) => {
    /**
     * Workaround to get the build process working
     * @web/storybook-builder sets `extractAssets: true`
     * for the rollup html plugin. But the same path doesn't
     * work in th development environment.
     * */
    const basePath =
      process.env.NODE_ENV === "production" ? ".storybook/static/" : ""
    return `
    ${head}
    <link rel="stylesheet" href="${basePath}fonts.css" />
    <link rel="stylesheet" href="${basePath}theme.css" />
  `
  },
  async wdsFinal(config) {
    config.open = false
    return config
  },
  async rollupFinal(config) {
    config.plugins = [
      ...config.plugins,
      ...rollupPlugins.map((p) => p.plugin(...p.args)),
      rollupCommonjs(),
      rollupJson(),
    ]

    return config
  },
}
export default config
