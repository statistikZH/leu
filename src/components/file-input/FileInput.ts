import { html } from "lit"
import { property, query, state } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./file-input.css"
import { LeuButton } from "../../index.js"
import { LeuIcon } from "../icon/leu-icon.js"
import { LeuVisuallyHidden } from "../visually-hidden/VisuallyHidden.js"

/**
 * @tagname leu-file-input
 */
export class LeuFileInput extends LeuElement {
  static dependencies = {
    "leu-icon": LeuIcon,
    "leu-button": LeuButton,
    "leu-visually-hidden": LeuVisuallyHidden,
  }

  static styles = [LeuElement.styles, styles]

  static shadowRootOptions = {
    ...LeuElement.shadowRootOptions,
    delegatesFocus: true,
  }

  @property({ type: String })
  value: string = ""

  @property({ type: String })
  accept: string = ""

  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  @property({ type: Boolean, reflect: true })
  multiple: boolean = false

  @state()
  protected files: File[] = []

  @query('input[type="file"]') input: HTMLInputElement

  protected handleInput() {
    // Append selected files
    if (this.input.files) {
      this.files = this.files.concat([...this.input.files])
    }

    // // Reset the input
    // this.input.value = '';

    // this.emit('sl-input');
  }

  protected removeFile(fileToRemove: File) {
    this.files = this.files.filter((file) => file !== fileToRemove)
  }

  protected static formatFileSize(size: number): string {
    if (size < 1e3) {
      return `${size} bytes`
    }

    if (size >= 1e3 && size < 1e6) {
      return `${(size / 1e3).toFixed(1)} KB`
    }

    return `${(size / 1e6).toFixed(1)} MB`
  }

  render() {
    return html`
      <leu-visually-hidden>
        <input
          type="file"
          ?multiple=${this.multiple}
          accept=${ifDefined(this.accept)}
          ?disabled=${this.disabled}
          @input=${this.handleInput}
        />
      </leu-visually-hidden>
      <leu-button
        variant="secondary"
        ?disabled=${this.disabled}
        @click=${() => this.input.click()}
      >
        Datei auswählen
        <leu-icon name="upload" slot="after"></leu-icon>
      </leu-button>
      <ul class="file-list">
        ${this.files.map(
          (file) =>
            html`<li class="file">
              <strong class="file__name">${file.name}</strong>
              <p class="file__size">
                Grösse: ${LeuFileInput.formatFileSize(file.size)}
              </p>
              <leu-button
                round
                label="Entfernen"
                size="small"
                variant="secondary"
                @click=${() => this.removeFile(file)}
                ><leu-icon name="delete"></leu-icon
              ></leu-button>
            </li>`,
        )}
      </ul>
    `
  }
}
