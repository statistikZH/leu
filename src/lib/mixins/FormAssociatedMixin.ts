import { LitElement } from "lit"
import { property } from "lit/decorators.js"

type AbstractConstructor<T = object> = abstract new (...args: any[]) => T

export const FormAssociatedMixin = <T extends AbstractConstructor<LitElement>>(
  superClass: T,
) => {
  abstract class FormAssociatedMixinClass extends superClass {
    static formAssociated = true

    protected readonly internals: ElementInternals = this.attachInternals()

    public constructor(...args: any[]) {
      super(...args)
    }

    get form() {
      return this.internals.form
    }

    @property()
    set name(value: string) {
      this.setAttribute("name", value)

      this.setFormValue()
    }

    get name() {
      return this.getAttribute("name")
    }

    get validity() {
      return this.internals.validity
    }

    get validationMessage() {
      return this.internals.validationMessage
    }

    get willValidate() {
      return this.internals.willValidate
    }

    public abstract formResetCallback(): void

    protected abstract setFormValue(): void
  }

  return FormAssociatedMixinClass
}
