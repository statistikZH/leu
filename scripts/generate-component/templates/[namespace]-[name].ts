import { [Namespace][Name] } from "./[Name].js"

export { [Namespace][Name] }

[Namespace][Name].define("[namespace]-[name]")

declare global {
  interface HTMLElementTagNameMap {
    "[namespace]-[name]": [Namespace][Name]
  }
}
