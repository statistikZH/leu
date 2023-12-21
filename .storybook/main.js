/** @type { import('@web/storybook-framework-web-components').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
  framework: {
    name: "@web/storybook-framework-web-components",
  },
  docs: {
    autodocs: "tag",
  },
  async wdsFinal(config) {
    config.open = false
    return config
  },
}
export default config
