import { html } from "lit"
import "../leu-breadcrumb.js"

export default {
  title: "Breadcrumb",
  component: "leu-breadcrumb",
}

function Template({ items, inverted }) {
  return html`
    ${inverted
      ? html`
          <div style="background: var(--leu-color-accent-blue);">
            <leu-breadcrumb .items=${items} inverted />
          </div>
        `
      : html` <leu-breadcrumb .items=${items} /> `}
    <button
      @click=${() => {
        document.getElementsByTagName("leu-breadcrumb")[0].setItems([
          { label: "Kanton Zürich", href: "https://zh.ch" },
          { label: "Bildung", href: "https://www.zh.ch/de/bildung.html" },
          {
            label: "Schulen",
            href: "https://www.zh.ch/de/bildung/schulen.html",
          },
          {
            label: "Volksschule",
            href: "https://www.zh.ch/de/bildung/schulen/volksschule.html",
          },
        ])
      }}
      style="margin-top:50px;"
    >
      update items
    </button>
  `
}

export const Regular = Template.bind({})
Regular.argTypes = {
  _allListElementWidths: { table: { disable: true } },
  _visible: { table: { disable: true } },
  _small: { table: { disable: true } },
  _resizeListenerFunction: { table: { disable: true } },
}
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
