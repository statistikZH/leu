import { defineConfig } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"
import type { BrowserCommand } from "vitest/node"
import { commonConfig } from "./tsdown.config.ts"

/**
 * Raw mouse button commands. `userEvent` only offers complete clicks, but
 * drag interactions need separate down and up events. Position the pointer
 * with `userEvent.hover(element, { position })` before calling these.
 */
const mouseDown: BrowserCommand<[]> = async (ctx) => {
  await ctx.page.mouse.down()
}

const mouseUp: BrowserCommand<[]> = async (ctx) => {
  await ctx.page.mouse.up()
}

const resetMouse: BrowserCommand<[]> = async (ctx) => {
  await ctx.page.mouse.up()
  await ctx.page.mouse.move(0, 0)
}

export default defineConfig({
  plugins: [...commonConfig.plugins],
  define: commonConfig.define,
  optimizeDeps: {
    include: ["axe-core", "vitest-axe/matchers", "vitest-browser-lit"],
  },
  test: {
    include: ["src/components/**/*.test.ts"],
    globals: true,
    setupFiles: ["src/test/setup.ts"],
    // Keyboard and focus tests get flaky when multiple test files compete
    // for focus in the same browser.
    fileParallelism: false,
    onConsoleLog(log) {
      if (log.includes("Lit is in dev mode")) {
        return false
      }
    },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      testerHtmlPath: "src/test/tester.html",
      viewport: { width: 800, height: 600 },
      screenshotFailures: false,
      commands: { mouseDown, mouseUp, resetMouse },
      instances: [{ browser: "chromium" }, { browser: "firefox" }],
    },
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.stories.ts", "src/**/test/**", "src/test/**"],
      reporter: ["text", "html", "lcov"],
    },
  },
})
