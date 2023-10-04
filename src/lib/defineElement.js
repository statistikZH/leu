/**
 * Adds a definition for a custom element to the custom element
 * registry if it isn't defined before. Prefixes the name with `leu-`.
 * @param {string} name
 * @param {HTMLElement} constructor
 */
export function defineElement(name, constructor) {
  if (!customElements.get(`leu-${name}`)) {
    customElements.define(`leu-${name}`, constructor)
  } else {
    console.info(`leu-${name} is already defined`)
  }
}
