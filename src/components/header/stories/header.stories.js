import { html } from "lit"
import "../leu-header.js"
import { THEME_COLORS } from "../Header.js"

export default {
  title: "Header",
  component: "leu-header",
}

function Template({ title, color, breadcrumb, subtitle, topTopics }) {
  return html`
    <leu-header
      title=${title}
      color=${color}
      .breadcrumb=${breadcrumb}
      subtitle=${subtitle}
      .topTopics=${topTopics}
    />
  `
}

export const Regular = Template.bind({})
Regular.argTypes = {
  color: { control: "select", options: THEME_COLORS },
}
Regular.args = {
  title: "Trinkwasser",
  color: "blue",
  breadcrumb: [{ label: "test", href: "www.google.ch" }],
  topTopics: [
    { label: "Trinkwasser", href: "www.google.ch" },
    { label: "Bewilligungen Gesundheitsberufe", href: "www.google.ch" },
    { label: "Übertragbare Krankheiten", href: "www.google.ch" },
    { label: "Spitalplanung 2023", href: "www.google.ch" },
  ],
  subtitle:
    "Im Jahr werden im Kanton Zürich rund 140 Millionen Kubikmeter Trinkwasser verbraucht. Dies entspricht in etwa dem Volumen des Greifensees. Das Trinkwasser kommt zu je 40 Prozent aus dem Zürichsee und aus Grundwasservorkommen. Die restlichen 20 Prozent stammen aus Quellen.",
}
Regular.parameters = {
  layout: "fullscreen",
}
