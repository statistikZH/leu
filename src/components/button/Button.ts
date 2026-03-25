import { html, nothing } from "lit"
import { classMap } from "lit/directives/class-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { property, query } from "lit/decorators.js"

import { LeuIcon } from "../icon/Icon.js"
import { LeuSpinner } from "../spinner/Spinner.js"
import { LeuElement } from "../../lib/LeuElement.js"
import { HasSlotController } from "../../lib/hasSlotController.js"
import { ARIA_CHECKED_ROLES, ARIA_SELECTED_ROLES } from "../../lib/a11y.js"

import styles from "./button.css?inline"
import { FormAssociatedMixin } from "../../lib/mixins/FormAssociatedMixin.js"

/**
 * @tagname leu-button
 * @slot before - The icon to display before the label
 * @slot after - The icon to display after the label
 * @slot - The label of the button or the icon if no label is set
 * @see https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=4-1444&mode=design&t=xu5Vii8jXKKCKDez-0
 */
export class LeuButton extends FormAssociatedMixin(LeuElement) {
  static dependencies = {
    "leu-icon": LeuIcon,
    "leu-spinner": LeuSpinner,
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

  /**
   * Replaces the content with a spinner
   */
  @property({ type: Boolean, reflect: true })
  loading: boolean = false

  @query(".button")
  private button!: HTMLButtonElement

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

  // The form value is set at the very moment the button is clicked.
  /* eslint-disable-next-line class-methods-use-this */
  setFormValue() {}

  protected handleClick(e: PointerEvent) {
    if (this.disabled || this.loading) {
      e.preventDefault()
      e.stopImmediatePropagation()
      return
    }

    const form = this.internals.form

    if (this.type === "button" || !form) {
      return
    }

    if (this.type === "reset") {
      form.reset()
    }

    /**
     * Form associated custom elements don't trigger form submission when they have `type="submit"`.
     * They also can't be passed as the submitter to `form.requestSubmit()`.
     * To work around this, we create a temporary hidden button, trigger the submission through it and remove it afterwards.
     * Hopefully we can move away from this workaround in the future.
     */
    if (this.type === "submit") {
      const proxyButton = document.createElement("button")
      Object.assign(proxyButton, {
        type: "submit",
        name: this.name,
        value: this.getAttribute("value") ?? "",
      })

      form.appendChild(proxyButton)
      form.requestSubmit(proxyButton)
      form.removeChild(proxyButton)
    }
  }

  click() {
    this.button.click()
  }

  focus(options?: FocusOptions) {
    this.button.focus(options)
  }

  blur() {
    this.button.blur()
  }

  render() {
    const hasTextContent = this.hasTextContent()
    const hasIconDefault = Boolean(this.querySelector("leu-icon"))
    const hasIconBefore = this.hasSlotController.test("before")
    const hasIconAfter = this.hasSlotController.test("after")
    const aria = this.getAriaAttributes()

    const cssClasses = {
      button: true,
      "icon-only": hasIconDefault && !hasTextContent,
      "icon-before": hasIconBefore,
      "icon-after": hasIconAfter,
      round: this.round,
      active: this.active,
      disabled: this.disabled,
      inverted: this.inverted,
      loading: this.loading,
      [this.variant]: true,
      [this.size]: true,
    }
    return html`
      <button
        @click=${this.handleClick}
        aria-label=${ifDefined(aria.label)}
        aria-selected=${ifDefined(aria.selected)}
        aria-checked=${ifDefined(aria.checked)}
        aria-expanded=${ifDefined(this.expanded)}
        role=${ifDefined(aria.role)}
        class=${classMap(cssClasses)}
        ?disabled=${this.disabled || this.loading}
        type=${this.type}
      >
        <div class="icon-wrapper icon-wrapper--before">
          <slot name="before" class="icon-wrapper__slot"></slot>
        </div>
        <span class="content"><slot></slot></span>
        <div class="icon-wrapper icon-wrapper--after">
          <slot name="after" class="icon-wrapper__slot"></slot>
        </div>
        ${this.loading
          ? html`<leu-spinner class="spinner"></leu-spinner>`
          : nothing}
        ${this.renderExpandingIcon()}
      </button>
    `
  }
}
