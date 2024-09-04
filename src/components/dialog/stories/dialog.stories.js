import { html } from "lit"
import "../leu-dialog.js"
import "../../input/leu-input.js"
import "../../button/leu-button.js"

import { createRef, ref } from "lit/directives/ref.js"

const dialog1 = createRef()
const dialog2 = createRef()

export default {
  title: "Dialog",
  component: "leu-dialog",
}

function Template({ label, rubric }) {
  return html`
    <leu-button @click=${() => dialog1.value.show()}>
      Dialog ohne Buttons
    </leu-button>

    <leu-button @click=${() => dialog2.value.show()}>
      Dialog mit Buttons
    </leu-button>

    <leu-dialog label="${label}" ref=${ref(dialog1)}>
      <leu-input label="Eingabe"></leu-input>
      <br />
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

    <leu-dialog label="${label}" rubric="${rubric}" ref=${ref(dialog2)}>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
      clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
      diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
      sit amet.
      <slot slot="actionbar">
        <leu-button
          variant="secondary"
          @click=${() => {
            // eslint-disable-next-line no-alert
            alert("Fenster wird geschlossen")
            dialog2.value.close()
          }}
        >
          Abbrechen
        </leu-button>
        <leu-button
          @click=${() => {
            // eslint-disable-next-line no-alert
            alert("Fenster wird offen gelassen")
          }}
        >
          Anwenden
        </leu-button>
      </slot>
    </leu-dialog>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Property: label",
  rubric: "Property: rubric",
}
