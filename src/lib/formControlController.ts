import { ReactiveController, ReactiveControllerHost } from "lit"
import { LeuElement } from "./LeuElement.js"

interface FormControl extends LeuElement {
  name: string
  value: unknown
  disabled?: boolean
}

export class FormControlController implements ReactiveController {
  host: ReactiveControllerHost & FormControl

  form: HTMLFormElement | null

  constructor(host: ReactiveControllerHost & FormControl) {
    this.host = host
    host.addController(this)
  }

  hostConnected() {
    this.attachForm()
  }

  hostDisconnected() {
    this.detachForm()
  }

  attachForm() {
    this.form = this.host.closest<HTMLFormElement>("form")
    if (this.form) {
      this.form.addEventListener("formdata", this.handleFormData)
    }
  }

  detachForm() {
    this.form?.removeEventListener("formdata", this.handleFormData)
    this.form = null
  }

  handleFormData = (event: FormDataEvent) => {
    if (this.host.isConnected && this.host.name && !this.host.disabled) {
      const { name, value } = this.host
      if (Array.isArray(value)) {
        ;(value as unknown[]).forEach((val) => {
          event.formData.append(
            name,
            (val as string | number | boolean).toString(),
          )
        })
      } else {
        event.formData.append(
          name,
          (value as string | number | boolean).toString(),
        )
      }
    }
  }
}
