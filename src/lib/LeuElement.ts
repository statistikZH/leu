import { CSSResultGroup, LitElement } from "lit"
import commonStyles from "../styles/common-styles.css"

export class LeuElement extends LitElement {
  static version = __LEU_VERSION__

  static dependencies: Record<string, typeof LeuElement> = {}

  static styles: CSSResultGroup = commonStyles

  static define(
    name: string,
    constructor = this,
    options: ElementDefinitionOptions = {},
  ) {
    Object.entries(this.dependencies).forEach(([n, c]) => c.define(n))

    const currentlyRegisteredConstructor = customElements.get(name) as
      | CustomElementConstructor
      | typeof LeuElement

    if (currentlyRegisteredConstructor === undefined) {
      customElements.define(name, constructor, options)
      return
    }

    if (currentlyRegisteredConstructor !== constructor) {
      console.warn(
        `The custom element with the name <${name}> is already registered with a different constructor. This can happen when the same element has been loaded from different modules (e.g. multiple CDN requests or bundles).`,
      )
      return
    }

    if (
      "version" in currentlyRegisteredConstructor &&
      currentlyRegisteredConstructor.version !== constructor.version
    ) {
      console.warn(
        `The custom element with the name <${name}> is already defined with the same constructor but a different version (${currentlyRegisteredConstructor.version}).`,
      )
    }
  }
}
