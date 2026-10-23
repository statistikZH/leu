import type { AxeMatchers } from "vitest-axe/matchers"

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/no-unused-vars
  interface Matchers<R, T> extends AxeMatchers {}
}

declare module "vitest/browser" {
  interface BrowserCommands {
    mouseDown: () => Promise<void>
    mouseUp: () => Promise<void>
    resetMouse: () => Promise<void>
  }
}
