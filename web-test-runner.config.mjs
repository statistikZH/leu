import { playwrightLauncher } from "@web/test-runner-playwright"
import { plugins as wdsPlugins } from "./web-dev-server.config.mjs"

const filteredLogs = ["Running in dev mode", "lit-html is in dev mode"]

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
  /** Test files to run */
  files: "src/components/**/*.test.js",
  plugins: wdsPlugins,
  mimeTypes: {
    "src/components/**/*.css": "js",
  },

  /** Resolve bare module imports */
  nodeResolve: {
    exportConditions: ["browser", "development"],
  },

  /** Filter out lit dev mode logs */
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (
        typeof arg === "string" &&
        filteredLogs.some((l) => arg.includes(l))
      ) {
        return false
      }
    }
    return true
  },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto',

  /** Amount of browsers to run concurrently */
  concurrentBrowsers: 2,

  /** Amount of test files per browser to test concurrently */
  concurrency: 1,

  /** Browsers to run tests on */
  browsers: [
    playwrightLauncher({ product: "chromium" }),
    playwrightLauncher({ product: "firefox" }),
    // playwrightLauncher({ product: "webkit" }),
  ],

  testsFinishTimeout: 10000,

  testRunnerHtml: (testFramework) =>
    `<html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="dist/theme.css" />
        <link rel="stylesheet" href="https://www.web.statistik.zh.ch/leu/styles/fonts.css" />
      </head>
      <body>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,

  // See documentation for all available options
})
