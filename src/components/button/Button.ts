import { html, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { property } from "lit/decorators.js"

import { LeuIcon } from "../icon/Icon.js"
import { LeuElement } from "../../lib/LeuElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"
import { ARIA_CHECKED_ROLES, ARIA_SELECTED_ROLES } from "../../lib/a11y.js"

import styles from "./button.css"

/**
 * @tagname leu-button
 * @slot before - The icon to display before the label
 * @slot after - The icon to display after the label
 * @slot - The label of the button or the icon if no label is set
 * @see https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=4-1444&mode=design&t=xu5Vii8jXKKCKDez-0
 */
export class LeuButton extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
  }

  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  private hasSlotController = new HasSlotController(this, [
    "before",
    "after",
    "[default]",
  ])

  /**
   * `aria-label` of the underlying button elements.
   * Use it to provide a label when only an icon is visible.
   */
  @property({ type: String, reflect: true })
  label: null | string = null

  /**
   * The size of the button.
   */
  @property({ type: String, reflect: true })
  size: "regular" | "small" = "regular"

  /**
   * The visual variant of the button.
   */
  @property({ type: String, reflect: true })
  variant: "primary" | "secondary" | "ghost" = "primary"

  /**
   * The `type` of the underlying button element.
   */
  @property({ type: String, reflect: true })
  type: "button" | "submit" | "reset" = "button"

  /**
   * The `role` of the underlying button element.
   */
  @property({ type: String, reflect: true })
  componentRole?: string

  /**
   * Whether the button is disabled or not.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  /**
   * Whether the button should be round.
   * Can only be applied when the button contains an icon without a visible label.
   * @type {boolean}
   */
  @property({ type: Boolean, reflect: true })
  round: boolean = false

  /**
   * Whether the button is active or not.
   * Depending on the `componentRole`, it applies `aria-checked` or `aria-selected` to the underlying button element.
   */
  @property({ type: Boolean, reflect: true })
  active: boolean = false

  /**
   * Wheter the colors should be inverted. For use on dark backgrounds.
   */
  @property({ type: Boolean, reflect: true })
  inverted: boolean = false

  /**
   * Whether the button is expanded or not.
   * Only has an effect on the variant `ghost` to show an expanding icon.
   * If the property is not set, the icon will not be shown.
   * If it is set, the icon will either show an expanded or collapsed state.
   */
  @property({ type: String, reflect: true })
  expanded?: "true" | "false"

  /**
   * Alters the shape of the button to be full width of its parent container
   */
  @property({ type: Boolean, reflect: true })
  fluid: boolean = false

  private renderExpandingIcon() {
    if (typeof this.expanded !== "undefined" && this.variant === "ghost") {
      return html`<div class="icon-expanded">
        <leu-icon name="angleDropDown" size="24"></leu-icon>
      </div>`
    }

    return nothing
  }

  private getAriaAttributes() {
    const attributes: {
      role: string
      label: string
      checked?: "true" | "false"
      selected?: "true" | "false"
    } = {
      role: this.componentRole,
      label: this.label,
    }

    // TODO: checked and selected roles are not mutually exclusive
    if (this.componentRole) {
      if (
        (ARIA_CHECKED_ROLES as ReadonlyArray<string>).includes(
          this.componentRole,
        )
      ) {
        attributes.checked = this.active ? "true" : "false"
      } else if (
        (ARIA_SELECTED_ROLES as ReadonlyArray<string>).includes(
          this.componentRole,
        )
      ) {
        attributes.selected = this.active ? "true" : "false"
      }
    }

    return attributes
  }

  private hasTextContent() {
    return Array.from(this.childNodes).some(
      (node) =>
        node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "",
    )
  }

  render() {
    const hasTextContent = this.hasTextContent()
    const hasIconDefault = Boolean(this.querySelector("leu-icon"))
    const hasIconBefore = this.hasSlotController.test("before")
    const hasIconAfter = this.hasSlotController.test("after")
    const aria = this.getAriaAttributes()

    const cssClasses = {
      button: true,
      "button--icon-only": hasIconDefault && !hasTextContent,
      "button--icon-before": hasIconBefore,
      "button--icon-after": hasIconAfter,
      "button--round": this.round,
      "button--active": this.active,
      "button--inverted": this.inverted,
      "button--fluid": this.fluid,
      [`button--${this.variant}`]: true,
      [`button--${this.size}`]: true,
    }

    return html`
      <button
        aria-label=${ifDefined(aria.label)}
        aria-selected=${ifDefined(aria.selected)}
        aria-checked=${ifDefined(aria.checked)}
        aria-expanded=${ifDefined(this.expanded)}
        role=${ifDefined(aria.role)}
        class=${classMap(cssClasses)}
        ?disabled=${this.disabled}
        type=${this.type}
      >
        <div class="icon-wrapper icon-wrapper--before">
          <slot name="before" class="icon-wrapper__slot"></slot>
        </div>
        <span class="content"><slot></slot></span>
        <div class="icon-wrapper icon-wrapper--after">
          <slot name="after" class="icon-wrapper__slot"></slot>
        </div>

        ${this.renderExpandingIcon()}
      </button>
    `
  }
}
