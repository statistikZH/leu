const postcssPresetEnv = require("postcss-preset-env")
const atImport = require("postcss-import")
const leuFontStyles = require("./scripts/postcss-leu-font-styles.cjs")

module.exports = {
  stage: 2,
  plugins: [
    atImport(),
    leuFontStyles(),
    postcssPresetEnv({
      features: {
        "custom-media-queries": true,
      },
    }),
  ],
}
