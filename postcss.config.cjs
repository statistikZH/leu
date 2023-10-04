const postcssPresetEnv = require("postcss-preset-env")

module.exports = {
  stage: 2,
  plugins: [
    postcssPresetEnv({
      features: {
        "custom-media-queries": true,
      },
    }),
  ],
}
