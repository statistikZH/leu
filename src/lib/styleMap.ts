/* eslint-disable prefer-template,no-param-reassign,no-restricted-syntax,guard-for-in */

/**
 * The original lit styleMap directive is not compatible with a strict style-src content security policy.
 * There is an an open issue about this in the lit repository:
 * https://github.com/lit/lit/issues/4719
 *
 * This file contains a custom implementation of the styleMap directive that bypasses
 * the render method and directly updates the styles using the .style.setProperty and
 * .style.removeProperty methods.
 *
 * In the original implementation, the render method returns a string that is set as the
 * value of the style attribute. This approach is blocked by strict CSPs that disallow
 * inline styles.
 *
 * As we don't support SSR in this library, we can safely skip the render method.
 */

import { AttributePart, noChange, nothing } from "lit"
import {
  directive,
  Directive,
  DirectiveParameters,
  PartInfo,
  PartType,
} from "lit/directive.js"

/**
 * A key-value set of CSS properties and values.
 *
 * The key should be either a valid CSS property name string, like
 * `'background-color'`, or a valid JavaScript camel case property name
 * for CSSStyleDeclaration like `backgroundColor`.
 */
export interface StyleInfo {
  [name: string]: string | number | undefined | null
}

const important = "important"
// The leading space is important
const importantFlag = " !" + important
// How many characters to remove from a value, as a negative number
const flagTrim = 0 - importantFlag.length

class StyleMapDirective extends Directive {
  private _previousStyleProperties?: Set<string>

  constructor(partInfo: PartInfo) {
    super(partInfo)
    if (
      partInfo.type !== PartType.ATTRIBUTE ||
      partInfo.name !== "style" ||
      (partInfo.strings?.length as number) > 2
    ) {
      throw new Error(
        "The `styleMap` directive must be used in the `style` attribute " +
          "and must be the only part in the attribute.",
      )
    }
  }

  render(_styleInfo: Readonly<StyleInfo>) {
    return nothing
  }

  override update(part: AttributePart, [styleInfo]: DirectiveParameters<this>) {
    const { style } = part.element as HTMLElement

    if (this._previousStyleProperties === undefined) {
      this._previousStyleProperties = new Set(Object.keys(styleInfo))
    }

    // Remove old properties that no longer exist in styleInfo
    for (const name of this._previousStyleProperties) {
      // If the name isn't in styleInfo or it's null/undefined
      if (styleInfo[name] == null) {
        this._previousStyleProperties!.delete(name)
        if (name.includes("-")) {
          style.removeProperty(name)
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(style as any)[name] = null
        }
      }
    }

    // Add or update properties
    for (const name in styleInfo) {
      const value = styleInfo[name]
      if (value != null) {
        this._previousStyleProperties.add(name)
        const isImportant =
          typeof value === "string" && value.endsWith(importantFlag)
        if (name.includes("-") || isImportant) {
          style.setProperty(
            name,
            isImportant
              ? (value as string).slice(0, flagTrim)
              : (value as string),
            isImportant ? important : "",
          )
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ;(style as any)[name] = value
        }
      }
    }
    return noChange
  }
}

/**
 * !A custom implementation of lit's `styleMap` directive!
 * A directive that applies CSS properties to an element.
 *
 * `styleMap` can only be used in the `style` attribute and must be the only
 * expression in the attribute. It takes the property names in the
 * {@link StyleInfo styleInfo} object and adds the properties to the inline
 * style of the element.
 *
 * Property names with dashes (`-`) are assumed to be valid CSS
 * property names and set on the element's style object using `setProperty()`.
 * Names without dashes are assumed to be camelCased JavaScript property names
 * and set on the element's style object using property assignment, allowing the
 * style object to translate JavaScript-style names to CSS property names.
 *
 * For example `styleMap({backgroundColor: 'red', 'border-top': '5px', '--size':
 * '0'})` sets the `background-color`, `border-top` and `--size` properties.
 *
 * @param styleInfo
 * @see {@link https://lit.dev/docs/templates/directives/#stylemap styleMap code samples on Lit.dev}
 */
export const styleMap = directive(StyleMapDirective)

/**
 * The type of the class that powers this directive. Necessary for naming the
 * directive's return type.
 */
export type { StyleMapDirective }
