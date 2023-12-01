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
  breadcrumb: [
    { label: "Kanton Zürich", href: "https://www.zh.ch/de.html" },
    { label: "Gesundheit", href: "https://www.zh.ch/de/gesundheit.html" },
    {
      label: "Lebensmittel & Gebrauchsgegenstände",
      href: "https://www.zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende.html",
    },
    {
      label: "Lebensmittel",
      href: "https://www.zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende/lebensmittel.html",
    },
    {
      label: "Trinkwasser",
      href: "https://www.zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende/lebensmittel/trinkwasser.html",
    },
  ],
  subtitle:
    "Im Jahr werden im Kanton Zürich rund 140 Millionen Kubikmeter Trinkwasser verbraucht. Dies entspricht in etwa dem Volumen des Greifensees. Das Trinkwasser kommt zu je 40 Prozent aus dem Zürichsee und aus Grundwasservorkommen. Die restlichen 20 Prozent stammen aus Quellen.",
}
Regular.parameters = {
  layout: "fullscreen",
}

export const TopTopics = Template.bind({})
TopTopics.argTypes = {
  color: { control: "select", options: THEME_COLORS },
}
TopTopics.args = {
  title: "Familie",
  color: "turquoise",
  breadcrumb: [
    { label: "Kanton Zürich", href: "https://www.zh.ch/de.html" },
    { label: "Familie", href: "https://www.zh.ch/de/familie.html" },
  ],
  topTopics: [
    {
      label: "Kinder- und Jugendhilfezentren",
      href: "https://www.zh.ch/de/familie/angebote-fuer-familien-mit-kindern/kinder-und-jugendhilfezentren.html",
    },
    {
      label: "Namensänderung",
      href: "https://www.zh.ch/de/familie/lebensereignisse/namensaenderung.html",
    },
    {
      label: "Sonderpädagogik",
      href: "https://www.zh.ch/de/familie/angebote-fuer-familien-mit-kindern/sonderpaedagogik.html",
    },
    { label: "Adoption", href: "https://www.zh.ch/de/familie/adoption.html" },
  ],
  subtitle:
    "Haben Sie Fragen zum Familienalltag oder suchen Sie Unterstützung bei familiären Herausforderungen? Möchten Sie mehr über die Geschichte Ihrer Familie erfahren? Oder steht ein wichtiges Ereignis bevor und Sie suchen Informationen, um Administratives zu erledigen? Hier finden Sie alles, was Familien im Kanton Zürich bewegt und was sie benötigen.",
}
TopTopics.parameters = {
  layout: "fullscreen",
}
