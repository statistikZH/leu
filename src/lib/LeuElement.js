import { LitElement } from "lit"

export class LeuElement extends LitElement {
  static dependencies = {}

  static define(name, constructor = this, options = {}) {
    if (!customElements.get(name)) {
      customElements.define(name, constructor, options)
    } else {
      console.info(`${name} is already defined`)
    }
  }

  constructor() {
    super()

    Object.entries(this.constructor.dependencies).forEach(
      ([name, component]) => {
        this.constructor.define(name, component)
      }
    )
  }
}
