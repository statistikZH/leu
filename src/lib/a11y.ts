/**
 * All roles that are associated with a aria-checked attribute
 * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
 */
export const ARIA_CHECKED_ROLES = [
  "checkbox",
  "menuitemcheckbox",
  "menuitemradio",
  "option",
  "radio",
  "switch",
] as const

/**
 * All roles that are associated with a aria-selected attribute
 * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected
 */
export const ARIA_SELECTED_ROLES = [
  "gridcell",
  "option",
  "row",
  "tab",
  "columnheader",
  "rowheader",
  "treeitem",
] as const
