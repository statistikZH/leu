import { html } from "lit"
import "../leu-breadcrumb.js"

export default {
  title: "Breadcrumb",
  component: "leu-breadcrumb",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=18100-258351&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
    html: {
      root: "[data-root]",
    },
  },
}

function Template({ items, inverted }) {
  return html`
    <div
      style=${inverted ? "background: var(--leu-color-accent-blue);" : ""}
      data-root
    >
      <leu-breadcrumb .items=${items} ?inverted=${inverted}></leu-breadcrumb>
    </div>
    <button
      @click=${() => {
        document.getElementsByTagName("leu-breadcrumb")[0].items = [
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
        ]
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
