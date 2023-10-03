import merge from "deepmerge"
// use createSpaConfig for bundling a Single Page App
// import { createSpaConfig } from "@open-wc/building-rollup"

// use createBasicConfig to do regular JS to JS bundling
import { createBasicConfig } from "@open-wc/building-rollup"

import postcss from "rollup-plugin-postcss"
import postcssLit from "rollup-plugin-postcss-lit"

const baseConfig = createBasicConfig({
  // use the outputdir option to modify where files are output
  // outputDir: 'dist',

  // if you need to support older browsers, such as IE11, set the legacyBuild
  // option to generate an additional build just for this browser
  // legacyBuild: true,

  // development mode creates a non-minified build for debugging or development
  developmentMode: process.env.ROLLUP_WATCH === "true",

  // set to true to inject the service worker registration into your index.html
  injectServiceWorker: false,
})

// export default
merge(baseConfig, {
  // if you use createSpaConfig, you can use your index.html as entrypoint,
  // any <script type="module"> inside will be bundled by rollup
  // input: "./index.html",

  // alternatively, you can use your JS as entrypoint for rollup and
  // optionally set a HTML template manually
  input: "./src/components/checkbox/checkbox.js",
  plugins: [postcss(), postcssLit()],
})

export default {
  input: [
    "./src/components/checkbox/checkbox.js",
    "./src/components/checkbox/checkbox-group.js",
    "./src/components/icon/icon.js",
    "./src/components/input/input.js",
    "./src/components/radio/radio.js",
    "./src/components/radio/radio-group.js",
    "./src/components/select/select.js",
    "./src/components/table/table.js",
  ],
  output: {
    dir: "./dist/",
    format: "esm",
  },
  plugins: [postcss(), postcssLit()],
}
