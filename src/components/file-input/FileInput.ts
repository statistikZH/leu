import { html, nothing } from "lit"
import { property, query, state } from "lit/decorators.js"
import { ifDefined } from "lit/directives/if-defined.js"
import { classMap } from "lit/directives/class-map.js"

import { LeuElement } from "../../lib/LeuElement.js"

import styles from "./file-input.css"
import { LeuButton } from "../../index.js"
import { LeuIcon } from "../icon/leu-icon.js"
import { LeuVisuallyHidden } from "../visually-hidden/VisuallyHidden.js"

/**
 * @todo Pluralize text when multiple files are allowed
 * @todo Hide dropzone when not multiple and already filled
 */

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

  static formAssociated = true

  protected internals: ElementInternals

  @property({ type: String })
  label: string = ""

  /** A list of acceptable file types. Must be a comma-separated list of [unique file type specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#unique_file_type_specifiers). */
  @property({ type: String })
  accept: string = ""

  /** Whether the file input is disabled. */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false

  /** Whether the file input allows multiple files. */
  @property({ type: Boolean, reflect: true })
  multiple: boolean = false

  /** Whether the file input is required. */
  @property({ type: Boolean, reflect: true })
  required: boolean = false

  /** The variant of the file list item. `filled` renders a gray background. */
  @property({ type: String, reflect: true })
  variant: "filled" | "transparent" = "filled"

  @state()
  public files: File[] = []

  @state()
  private isDragging: boolean = false

  @query('input[type="file"]')
  input: HTMLInputElement

  constructor() {
    super()
    // Initialize the ElementInternals for form association
    this.internals = this.attachInternals()
  }

  get form() {
    return this.internals.form
  }

  get name() {
    return this.getAttribute("name")
  }

  updated(changedProperties) {
    if (
      changedProperties.has("files") ||
      changedProperties.has("disabled") ||
      changedProperties.has("multiple")
    ) {
      this.updateFormValue()
    }
  }

  protected handleInput() {
    // Append selected files
    if (this.input.files) {
      const acceptableFiles = [...this.input.files].filter((file) =>
        this.isAcceptedFile(file),
      )

      this.files = this.multiple
        ? this.files.concat(acceptableFiles)
        : acceptableFiles.slice(0, 1)
    }
  }

  public formResetCallback() {
    this.files = []
    this.input.value = ""
  }

  protected updateFormValue() {
    const formData = new FormData()

    const files = this.multiple ? this.files : this.files.slice(0, 1)

    files.forEach((file) => {
      formData.append(this.name, file)
    })

    this.internals.setFormValue(formData)
  }

  protected removeFile(fileToRemove: File) {
    this.files = this.files.filter((file) => file !== fileToRemove)
  }

  protected static formatFileSize(size: number) {
    if (size < 1e3) {
      return html`${size}&nbsp;bytes`
    }

    if (size >= 1e3 && size < 1e6) {
      return html`${(size / 1e3).toFixed(1)}&nbsp;KB`
    }

    return html`${(size / 1e6).toFixed(1)}&nbsp;MB`
  }

  protected handleDragEnter = (event: DragEvent) => {
    if (this.disabled) return

    event.preventDefault()
    event.stopPropagation()
    this.isDragging = [...event.dataTransfer.items].some(
      (item) => item.kind === "file",
    )
  }

  // eslint-disable-next-line class-methods-use-this
  protected handleDragOver = (event: DragEvent) => {
    if (this.disabled) return

    event.preventDefault()
    event.stopPropagation()
  }

  protected handleDragLeave = (event: DragEvent) => {
    if (this.disabled) return

    event.preventDefault()
    event.stopPropagation()
    this.isDragging = false
  }

  protected handleDrop = (event: DragEvent) => {
    if (this.disabled) return

    event.preventDefault()
    event.stopPropagation()

    const dt = event.dataTransfer
    const files = dt.files
    const acceptedFiles = [...files].filter((file) => this.isAcceptedFile(file))

    this.files = this.multiple
      ? this.files.concat(acceptedFiles)
      : acceptedFiles.slice(0, 1)
    this.isDragging = false
  }

  isAcceptedFile(file: File): boolean {
    const acceptedTypes = this.accept.split(",").map((type) => type.trim())
    const mimeType = file.type

    for (const acceptedType of acceptedTypes) {
      // Handle file extensions (e.g. .jpg, .png)
      if (acceptedType.startsWith(".")) {
        const name = file.name.toLowerCase()
        const extension = acceptedType.toLowerCase()

        if (name.endsWith(extension)) {
          return true
        }
        // Handle wildcard types (e.g. image/*)
      } else if (/^\w+\/\*$/.test(acceptedType)) {
        if (mimeType.split("/")[0] === acceptedType.split("/")[0]) {
          return true
        }
      }

      if (mimeType === acceptedType) {
        return true
      }
    }

    return false
  }

  render() {
    const dropzoneClasses = {
      dropzone: true,
      "dropzone--dragging": this.isDragging,
    }

    return html`
      <div class="container">
        <label class="label" for="input">${this.label}</label>
        <leu-visually-hidden>
          <input
            id="input"
            type="file"
            ?multiple=${this.multiple}
            accept=${ifDefined(this.accept)}
            ?disabled=${this.disabled}
            @input=${this.handleInput}
          />
        </leu-visually-hidden>
        <div
          class=${classMap(dropzoneClasses)}
          @dragenter=${this.handleDragEnter}
          @dragover=${this.handleDragOver}
          @dragleave=${this.handleDragLeave}
          @drop=${this.handleDrop}
        >
          <slot class="dropzone__text"
            ><p>Zum Hochladen Dateien ziehen und hier ablegen.</p></slot
          >
          <leu-button
            variant="secondary"
            ?disabled=${this.disabled}
            @click=${() => this.input.click()}
          >
            Datei auswählen
            <leu-icon name="upload" slot="after"></leu-icon>
          </leu-button>
        </div>
        ${this.files.length > 0
          ? html`<ul class="file-list">
              ${this.files.map(
                (file) =>
                  html`<li class="file">
                    <strong class="file__name">${file.name}</strong>
                    <p class="file__size">
                      <span class="file__size-label">Grösse:</span>
                      ${LeuFileInput.formatFileSize(file.size)}
                    </p>
                    <leu-button
                      round
                      class="file__button"
                      label="Datei entfernen"
                      size="small"
                      variant="secondary"
                      ?disabled=${this.disabled}
                      @click=${() => this.removeFile(file)}
                      ><leu-icon name="delete"></leu-icon
                    ></leu-button>
                  </li>`,
              )}
            </ul>`
          : nothing}
      </div>
    `
  }
}
