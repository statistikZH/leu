import { html } from "lit"
import { ifDefined } from "lit/directives/if-defined.js"

import "../leu-select.js"

export default {
  title: "select",
  component: "leu-select",
}

const OPTIONS_EXAMPLES = [
  { label: "Option 1", value: "1" },
  "Option 2",
  "Option 3",
  "Sehr lange Option um zu schauen was passiert, wenn es zu lang wird.",
]
const OPTIONS_MUNICIPALITIES = [
  "Aeugst am Albis",
  "Affoltern am Albis",
  "Bonstetten",
  "Hausen am Albis",
  "Hedingen",
  "Kappel am Albis",
  "Knonau",
  "Maschwanden",
  "Mettmenstetten",
  "Obfelden",
  "Ottenbach",
  "Rifferswil",
  "Stallikon",
  "Wettswil am Albis",
  "Benken (ZH)",
  "Berg am Irchel",
  "Buch am Irchel",
  "Dachsen",
  "Dorf",
  "Feuerthalen",
  "Flaach",
  "Flurlingen",
  "Henggart",
  "Kleinandelfingen",
  "Laufen-Uhwiesen",
  "Marthalen",
  "Ossingen",
  "Rheinau",
  "Thalheim an der Thur",
  "Trüllikon",
  "Truttikon",
  "Volken",
  "Bachenbülach",
  "Bassersdorf",
  "Bülach",
  "Dietlikon",
  "Eglisau",
  "Embrach",
  "Freienstein-Teufen",
  "Glattfelden",
  "Hochfelden",
  "Höri",
  "Hüntwangen",
  "Kloten",
  "Lufingen",
  "Nürensdorf",
  "Oberembrach",
  "Opfikon",
  "Rafz",
  "Rorbas",
  "Wallisellen",
  "Wasterkingen",
  "Wil (ZH)",
  "Winkel",
  "Bachs",
  "Boppelsen",
  "Buchs (ZH)",
  "Dällikon",
  "Dänikon",
  "Dielsdorf",
  "Hüttikon",
  "Neerach",
  "Niederglatt",
  "Niederhasli",
  "Niederweningen",
  "Oberglatt",
  "Oberweningen",
  "Otelfingen",
  "Regensberg",
  "Regensdorf",
  "Rümlang",
  "Schleinikon",
  "Schöfflisdorf",
  "Stadel",
  "Steinmaur",
  "Weiach",
  "Bäretswil",
  "Bubikon",
  "Dürnten",
  "Fischenthal",
  "Gossau (ZH)",
  "Grüningen",
  "Hinwil",
  "Rüti (ZH)",
  "Seegräben",
  "Wald (ZH)",
  "Wetzikon (ZH)",
  "Adliswil",
  "Kilchberg (ZH)",
  "Langnau am Albis",
  "Oberrieden",
  "Richterswil",
  "Rüschlikon",
  "Thalwil",
  "Erlenbach (ZH)",
  "Herrliberg",
  "Hombrechtikon",
  "Küsnacht (ZH)",
  "Männedorf",
  "Meilen",
  "Oetwil am See",
  "Stäfa",
  "Uetikon am See",
  "Zumikon",
  "Zollikon",
  "Fehraltorf",
  "Hittnau",
  "Lindau",
  "Pfäffikon",
  "Russikon",
  "Weisslingen",
  "Wila",
  "Wildberg",
  "Dübendorf",
  "Egg",
  "Fällanden",
  "Greifensee",
  "Maur",
  "Mönchaltorf",
  "Schwerzenbach",
  "Uster",
  "Volketswil",
  "Wangen-Brüttisellen",
  "Altikon",
  "Brütten",
  "Dägerlen",
  "Dättlikon",
  "Dinhard",
  "Ellikon an der Thur",
  "Elsau",
  "Hagenbuch",
  "Hettlingen",
  "Neftenbach",
  "Pfungen",
  "Rickenbach (ZH)",
  "Schlatt (ZH)",
  "Seuzach",
  "Turbenthal",
  "Winterthur",
  "Zell (ZH)",
  "Aesch (ZH)",
  "Birmensdorf (ZH)",
  "Dietikon",
  "Geroldswil",
  "Oberengstringen",
  "Oetwil an der Limmat",
  "Schlieren",
  "Uitikon",
  "Unterengstringen",
  "Urdorf",
  "Weiningen (ZH)",
  "Zürich",
  "Andelfingen",
  "Stammheim",
  "Wädenswil",
  "Elgg",
  "Horgen",
  "Illnau-Effretikon",
  "Bauma",
  "Wiesendangen",
]

function Template({
  label,
  options,
  value,
  disabled = false,
  clearable = false,
  filterable = false,
  multiple = false,
  before,
  after,
}) {
  return html`
    <leu-select
      class="dropdown"
      .options=${options}
      label=${ifDefined(label)}
      .value=${ifDefined(value)}
      ?clearable=${clearable}
      ?disabled=${disabled}
      ?filterable=${filterable}
      ?multiple=${multiple}
    >
      ${before ? html`<div slot="before">${before}</div>` : ""}
      ${after ? html`<div slot="after">${after}</div>` : ""}
    </leu-select>
  `
}

function TemplateSlots(args) {
  const before = html`<div>before</div>`
  const after = html`<div>after <input type="text"></input></div>`

  return Template({ ...args, before, after })
}

export const Regular = Template.bind({})
Regular.args = {
  label: "",
  options: OPTIONS_EXAMPLES,
}

export const Labeled = Template.bind({})
Labeled.args = {
  label: "Option auswählen",
  options: OPTIONS_EXAMPLES,
}

export const Filled = Template.bind({})
Filled.args = {
  label: "Option auswählen",
  options: OPTIONS_EXAMPLES,
  value: [OPTIONS_EXAMPLES[1]],
}

export const Clearable = Template.bind({})
Clearable.args = {
  label: "Option auswählen",
  options: OPTIONS_EXAMPLES,
  value: [OPTIONS_EXAMPLES[1]],
  clearable: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Option auswählen",
  options: OPTIONS_EXAMPLES,
  clearable: true,
  disabled: true,
}

export const DisabledFilled = Template.bind({})
DisabledFilled.args = {
  label: "Option auswählen",
  options: OPTIONS_EXAMPLES,
  value: [OPTIONS_EXAMPLES[1]],
  clearable: true,
  disabled: true,
}

export const Filterable = Template.bind({})
Filterable.args = {
  label: "Option auswählen",
  options: OPTIONS_MUNICIPALITIES,
  clearable: true,
  disabled: false,
  filterable: true,
}

/* I also tried sloting the before and after. It doesn't work because the blur event is triggered everytime a slot is clicked */
export const BeforeAfterSlot = TemplateSlots.bind({})
BeforeAfterSlot.args = {
  label: "Option auswählen",
  options: OPTIONS_MUNICIPALITIES,
  clearable: true,
  disabled: false,
  filterable: false,
  multiple: true,
}

export const Multiple = Template.bind({})
Multiple.args = {
  label: "Option auswählen",
  options: OPTIONS_MUNICIPALITIES,
  clearable: true,
  disabled: false,
  filterable: true,
  multiple: true,
}

export const MultipleFilled = Template.bind({})
MultipleFilled.args = {
  label: "Option auswählen",
  options: OPTIONS_MUNICIPALITIES,
  value: OPTIONS_MUNICIPALITIES.slice(0, 2),
  clearable: true,
  disabled: false,
  filterable: true,
  multiple: true,
}
