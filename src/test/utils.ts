import AxeCore from "axe-core"
import type { LitElement } from "lit"
import { render } from "vitest-browser-lit"

/**
 * Renders a template and resolves with its first element once that element
 * has finished its first update. Elements without an `updateComplete`
 * promise (e.g. a plain wrapper `div`) are given one animation frame.
 */
export async function fixture<T extends Element = LitElement>(
  template: unknown,
): Promise<T> {
  const { container } = render(template)
  const el = container.firstElementChild as T

  if ("updateComplete" in el) {
    await el.updateComplete
  } else {
    await new Promise((resolve) => requestAnimationFrame(resolve))
  }

  return el
}

/**
 * Resolves with the next event of the given name dispatched on the target.
 */
export function oneEvent<T extends Event = CustomEvent>(
  target: EventTarget,
  eventName: string,
): Promise<T> {
  return new Promise((resolve) => {
    target.addEventListener(eventName, (e) => resolve(e as T), { once: true })
  })
}

/**
 * Runs an axe-core audit on the element. vitest-axe's own `axe` helper
 * relies on node APIs, so only its `toHaveNoViolations` matcher is used.
 */
export function axe(element: Element, options: AxeCore.RunOptions = {}) {
  return AxeCore.run(element, { resultTypes: ["violations"], ...options })
}
