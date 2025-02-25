import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-accordion.js"

export default {
  title: "Components/Accordion",
  component: "leu-accordion",
  argTypes: {
    headingLevel: {
      control: "select",
      options: [1, 2, 3, 4, 5, 6],
    },
    content: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=17341-82464&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

function Template(args) {
  return html` <leu-accordion
    heading-level=${ifDefined(args.headingLevel)}
    label=${ifDefined(args.label)}
    label-prefix=${ifDefined(args.labelPrefix)}
  >
    <div slot="content">${args.content}</div>
  </leu-accordion>`
}

export const Regular = Template.bind({})
Regular.args = {
  headingLevel: 2,
  label:
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

export const Prefix = Template.bind({})
Prefix.args = {
  ...Regular.args,
  labelPrefix: "01",
}
