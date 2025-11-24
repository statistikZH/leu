import { LeuChartWrapper } from "./ChartWrapper.js"

export { LeuChartWrapper }

LeuChartWrapper.define("leu-chart-wrapper")

declare global {
  interface HTMLElementTagNameMap {
    "leu-chart-wrapper": LeuChartWrapper
  }
}
