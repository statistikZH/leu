declare module "*.css?inline" {
  import { CSSResult } from "lit"

  const css: CSSResult
  export default css
}

/**
 * The value is injected at build time.
 */
declare const __LEU_VERSION__: string
