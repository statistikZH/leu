import rollupJson from "@rollup/plugin-json"
import rollupCommonjs from "@rollup/plugin-commonjs"

import { plugins as rollupPlugins } from "../rollup.config.js"

/** @type { import('@web/storybook-framework-web-components').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-designs",
    "@whitespace/storybook-addon-html",
  ],
  staticDirs: ["static"],
  framework: {
    name: "@storybook/web-components-webpack5",
    options: {},
  },
  docs: {
    autodocs: false,
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
