const postcssPresetEnv = require("postcss-preset-env")
const atImport = require("postcss-import")

module.exports = {
  stage: 2,
  plugins: [
    atImport(),
    postcssPresetEnv({
      features: {
        "custom-media-queries": true,
      },
    }),
  ],
}
