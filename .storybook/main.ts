import rollupJson from "@rollup/plugin-json"
import rollupCommonjs from "@rollup/plugin-commonjs"
import rollupTypescript from "rollup-plugin-typescript2"
import { defineMain } from "@storybook/web-components-vite/node"

import { fileURLToPath } from "url"

import { plugins as rollupPlugins } from "../rollup.config.js"

export default defineMain({
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-designs",
    // "@whitespace/storybook-addon-html", // TODO: Is it already compatible with Storybook 10?
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  staticDirs: ["static"],
  framework: "@storybook/web-components-vite",
  docs: {},
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
  previewHead: (head) => {
    /**
     * Workaround to get the build process working
     * @web/storybook-builder sets `extractAssets: true`
     * for the rollup html plugin. But the same path doesn't
     * work in the development environment.
     * */
    const basePath =
      process.env.NODE_ENV === "production" ? ".storybook/static/" : ""
    return `
    ${head}
    <link rel="stylesheet" href="${basePath}fonts.css" />
    <link rel="stylesheet" href="${basePath}theme.css" />
  `
  },
})
