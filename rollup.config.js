import postcss from "rollup-plugin-postcss"
import postcssLit from "rollup-plugin-postcss-lit"
import { babel } from "@rollup/plugin-babel"

export const plugins = [
  {
    plugin: postcss,
    args: [
      {
        inject: false,
      },
    ],
  },
  {
    plugin: postcssLit,
    args: [],
  },
]

export default {
  input: [
    "index.js",
    "./src/components/button/leu-button.js",
    "./src/components/button/Button.js",
    "./src/components/button-group/leu-button-group.js",
    "./src/components/button-group/ButtonGroup.js",
    "./src/components/checkbox/leu-checkbox.js",
    "./src/components/checkbox/leu-checkbox-group.js",
    "./src/components/checkbox/Checkbox.js",
    "./src/components/checkbox/CheckboxGroup.js",
    "./src/components/chip/leu-chip-group.js",
    "./src/components/chip/leu-chip-link.js",
    "./src/components/chip/leu-chip-removable.js",
    "./src/components/chip/leu-chip-selectable.js",
    "./src/components/chip/ChipGroup.js",
    "./src/components/chip/ChipLink.js",
    "./src/components/chip/ChipRemovable.js",
    "./src/components/chip/ChipSelectable.js",
    "./src/components/dropdown/leu-dropdown.js",
    "./src/components/dropdown/Dropdown.js",
    "./src/components/input/leu-input.js",
    "./src/components/input/Input.js",
    "./src/components/menu/leu-menu.js",
    "./src/components/menu/leu-menu-item.js",
    "./src/components/menu/Menu.js",
    "./src/components/menu/MenuItem.js",
    "./src/components/pagination/leu-pagination.js",
    "./src/components/pagination/Pagination.js",
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
    babel({ babelHelpers: "bundled" }),
    ...plugins.map((p) => p.plugin(...p.args)),
  ],
}

// TODO: add a second config for a bundle with esbuild
// import esbuild from "rollup-plugin-esbuild"
