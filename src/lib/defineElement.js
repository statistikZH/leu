export function defineElement(name, constructor) {
  if (!customElements.get(`leu-${name}`)) {
    customElements.define(`leu-${name}`, constructor)
  } else {
    console.info(`leu-${name} is already defined`)
  }
}
