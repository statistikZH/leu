import { html } from "lit"
import "../leu-dialog.js"
import "../../input/leu-input.js"
import "../../button/leu-button.js"

import { createRef, ref } from "lit/directives/ref.js"

const dialog1 = createRef()
const dialog2 = createRef()

function show(reference) {
  if (reference.value) {
    reference.value._show()
  }
}

export default {
  title: "Dialog",
  component: "leu-dialog",
}

function Template({ label }) {
  return html`
    <leu-button @click=${() => show(dialog1)}> Dialog ohne Buttons </leu-button>

    <leu-button @click=${() => show(dialog2)}> Dialog mit Buttons </leu-button>

    <leu-dialog label="${label}" ref=${ref(dialog1)}>
      <leu-input label="Eingabe" />
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
    </leu-dialog>

    <leu-dialog label="${label}" ref=${ref(dialog2)}>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
      <div slot="toolbar">
        <leu-button
          variant="secondary"
          @click=${() => {
            alert("cancel")
          }}
        >
          Abbrechen
        </leu-button>
        <leu-button
          @click=${() => {
            alert("ok")
          }}
        >
          Anwenden
        </leu-button>
      </div>
    </leu-dialog>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Titel",
}
