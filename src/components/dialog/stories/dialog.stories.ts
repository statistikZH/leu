import { html } from "lit"
import "../leu-dialog.js"
import "../../input/leu-input.js"
import "../../button/leu-button.js"

export default {
  title: "Components/Dialog",
  component: "leu-dialog",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?node-id=16052-88818&node-type=canvas&t=swv3JY6UIoCBUpXa-11",
    },
  },
}

function openDialog() {
  document.querySelector("leu-dialog").show()
}

function closeDialog() {
  document.querySelector("leu-dialog").close()
}

function OpenDialogButton() {
  return html` <leu-button @click=${() => openDialog()}>
    Open dialog
  </leu-button>`
}

function Template({ label, sublabel }) {
  return html`
    ${OpenDialogButton()}

    <leu-dialog label="${label}" sublabel="${sublabel}">
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
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: "Property: label",
  rubric: "Property: sublabel",
}

function ActionButtonsTemplate({ label, sublabel }) {
  return html`
    ${OpenDialogButton()}

    <leu-dialog label="${label}" sublabel="${sublabel}">
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
            closeDialog()
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

export const ActionButtons = ActionButtonsTemplate.bind({})
ActionButtons.args = {
  label: "Property: label",
  sublabel: "Property: sublabel",
}

function SmallContentTemplate({ label, sublabel }) {
  return html`
    ${OpenDialogButton()}

    <leu-dialog label="${label}" sublabel="${sublabel}">
      <p>Ein kurzer Text</p>
    </leu-dialog>
  `
}

export const SmallContent = SmallContentTemplate.bind({})
SmallContent.args = {
  label: "Dialog Titel",
  sublabel: "Property: sublabel",
}

function ScrollablePageTemplate({ label, sublabel }) {
  return html`
    <div style="height: 200vh">
      ${OpenDialogButton()}

      <leu-dialog label="${label}" sublabel="${sublabel}">
        <leu-input label="Eingabe"></leu-input>
        <br />
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet.
      </leu-dialog>
    </div>
    <div style="height: 200vh">${OpenDialogButton()}</div>
  `
}

export const ScrollablePage = ScrollablePageTemplate.bind({})
ScrollablePage.args = {
  label: "Dialog Titel",
  sublabel: "Property: sublabel",
}
