/** @type { import('@web/storybook-framework-web-components').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  framework: {
    name: "@web/storybook-framework-web-components",
  },
  docs: {
    autodocs: "tag",
  },
}
export default config
