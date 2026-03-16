import { defineMain } from "@storybook/web-components-vite/node"

import postcssLit from "rollup-plugin-postcss-lit"

export default defineMain({
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-designs",
    "@whitespace/storybook-addon-html",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  staticDirs: ["static"],
  framework: "@storybook/web-components-vite",
  docs: {},
  core: {
    disableTelemetry: true,
  },
  previewHead: (head) => {
    return `
      ${head}
      <link rel="stylesheet" href="fonts.css" />
      <link rel="stylesheet" href="theme.css" />
    `
  },
  async viteFinal(config) {
    /* eslint-disable-next-line import-x/no-extraneous-dependencies */
    const { mergeConfig } = await import("vite")

    return mergeConfig(config, {
      plugins: [postcssLit()],
      define: {
        __LEU_VERSION__: JSON.stringify(process.env.npm_package_version),
      },
    })
  },
})
