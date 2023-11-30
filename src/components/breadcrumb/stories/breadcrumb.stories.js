import { html } from "lit"
import "../leu-breadcrumb.js"

export default {
  title: "Breadcrumb",
  component: "leu-breadcrumb",
}

function Template({ items, inverted }) {
  return html`${inverted
    ? html`
        <div style="background: var(--leu-color-accent-blue);">
          <leu-breadcrumb .items=${items} inverted />
        </div>
      `
    : html` <leu-breadcrumb .items=${items} /> `}`
}

export const Regular = Template.bind({})
Regular.args = {
  items: [
    { label: "Kanton Zürich", href: "https://zh.ch" },
    { label: "Gesundheit", href: "https://zh.ch/de/gesundheit.html" },
    {
      label: "Lebensmittel & Gebrauchsgegenstände",
      href: "https://zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende.html",
    },
    {
      label: "Lebensmittel",
      href: "https://zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende/lebensmittel.html",
    },
    {
      label: "Trinkwasser",
      href: "https://zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende/lebensmittel.html",
    },
  ],
  inverted: true,
}
