import postcss from "rollup-plugin-postcss"
import postcssLit from "rollup-plugin-postcss-lit"

export default {
  input: [
    "index.js",
    "./src/components/checkbox/leu-checkbox.js",
    "./src/components/checkbox/leu-checkbox-group.js",
    "./src/components/checkbox/Checkbox.js",
    "./src/components/checkbox/CheckboxGroup.js",
    "./src/components/input/leu-input.js",
    "./src/components/input/Input.js",
    "./src/components/radio/leu-radio.js",
    "./src/components/radio/leu-radio-group.js",
    "./src/components/radio/Radio.js",
    "./src/components/radio/RadioGroup.js",
    "./src/components/select/leu-select.js",
    "./src/components/select/Select.js",
    "./src/components/table/leu-table.js",
    "./src/components/table/Table.js",
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
