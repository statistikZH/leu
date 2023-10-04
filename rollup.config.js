import postcss from "rollup-plugin-postcss"
import postcssLit from "rollup-plugin-postcss-lit"

export default {
  input: [
    "index.js",
    "./src/components/radio/leu-radio.js",
    "./src/components/radio/leu-radio-group.js",
    "./src/components/radio/Radio.js",
    "./src/components/radio/RadioGroup.js",
  ],
  output: {
    dir: "./dist/",
    format: "esm",
    entryFileNames: "[name].js",
  },
  plugins: [
    postcss({
      inject: false,
    }),
    postcssLit(),
  ],
}

// TODO: add a second config for a bundle with esbuild
// import esbuild from "rollup-plugin-esbuild"
