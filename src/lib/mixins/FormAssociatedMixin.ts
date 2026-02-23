import { LitElement } from "lit"
import { property } from "lit/decorators.js"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AbstractConstructor<T = object> = abstract new (...args: any[]) => T

export const FormAssociatedMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
) => {
  abstract class FormAssociatedMixinClass extends superClass {
    static formAssociated = true

    protected readonly internals: ElementInternals = this.attachInternals()

    get form() {
      return this.internals.form
    }

    /** The name of the form control. Is submitted with the `value` as key-value pair. */
    @property({ reflect: true })
    name: string | null = null

    /** Disables the form control. */
    @property({ type: Boolean })
    disabled: boolean = false

    // Treat every form control that doesn't implement its own `required` property as "not required"
    required: boolean = false

    /** Whether the user has interacted with the form control. */
    @property({ state: true, attribute: false })
    protected hasInteracted: boolean = false

    get validity() {
      return this.internals.validity
    }

    get validationMessage() {
      return this.internals.validationMessage
    }

    get willValidate() {
      return this.internals.willValidate
    }

    checkValidity() {
      return this.internals.checkValidity()
    }

    reportValidity() {
      return this.internals.reportValidity()
    }

    resetValidity() {
      this.internals.setValidity({})
    }

    public formDisabledCallback(isDisabled: boolean) {
      this.disabled = isDisabled
    }

    public formResetCallback() {
      this.hasInteracted = false
      this.resetValidity()
    }

    public formStateRestoreCallback(_state: string | FormData | null) {
      this.resetValidity()
    }

    protected abstract setFormValue(): void
  }

  return FormAssociatedMixinClass
}
