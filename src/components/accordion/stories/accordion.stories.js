import { html, nothing } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-accordion.js"

export default {
  title: "Accordion",
  component: "leu-accordion",
  argTypes: {
    headingLevel: {
      control: {
        type: "select",
        options: [0, 1, 2, 3, 4, 5, 6],
      },
    },
    titleNumber: {
      control: {
        type: "text",
      },
    },
    title: {
      control: {
        type: "text",
      },
    },
    content: {
      control: {
        type: "textarea",
      },
    },
  },
}

function Template(args) {
  return html` <leu-accordion heading-level=${ifDefined(args.headingLevel)}>
    ${args.titleNumber
      ? html`<span slot="title-number">${args.titleNumber}</span>`
      : nothing}
    <span slot="title">${args.title}</span>
    <div slot="content">${args.content}</div>
  </leu-accordion>`
}

export const Regular = Template.bind({})
Regular.args = {
  headingLevel: 2,
  titleNumber: "01",
  title:
    "Akkordeontitel der lang und noch länger werden kann und dann umbricht",
  content: `Regular Interessierte können ab sofort die Genauigkeit ihrer Smartphones
  und Navigationsgeräte überprüfen. Die Baudirektion hat beim Landesmuseum
  in Zürich einen Kontrollpunkt beim Landesmuseum in Zürich einen
  Kontrollpunktfür mobile Geräte eingerichtet – den ersten in der
  Schweiz.P, Helvetic Roman Interessierte können ab sofort die Genauigkeit
  ihrer Smartphones und Navigationsgeräte überprüfen.

  Die Zürich einen Kontrollpunktfür mobile einen Kontrollpunkt beim
  Landesmuseum in Zürich einen Kontrollpunktfür mobile Geräte eingerichtet
  – den ersten in der Schweiz.`,
}
