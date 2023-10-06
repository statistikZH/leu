import { html } from "lit"
import "../leu-select.js"

export default {
  title: "select",
  component: "leu-select",
}

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
      options=${options}
      label=${label}
      value=${value}
      ?clearable=${clearable}
      ?disabled=${disabled}
      ?filterable=${filterable}
      ?multiple=${multiple}
      before=${before}
      after=${after}
    >
    </leu-select>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  label: "",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Sehr lange Option um zu schauen was passiert, wenn es zu lang wird."]',
}

export const Labeled = Template.bind({})
Labeled.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Sehr lange Option um zu schauen was passiert, wenn es zu lang wird."]',
  value: null,
}

export const Filled = Template.bind({})
Filled.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Option 4"]',
  value: "Option 2",
}

export const Clearable = Template.bind({})
Clearable.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Option 4"]',
  value: "Option 2",
  clearable: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Option 4"]',
  value: null,
  clearable: true,
  disabled: true,
}

export const DisabledFilled = Template.bind({})
DisabledFilled.args = {
  label: "Option auswählen",
  options:
    '[{"label":"Option 1", "value":"1"}, "Option 2", "Option 3", "Option 4"]',
  value: "Option 2",
  clearable: true,
  disabled: true,
}

export const Filterable = Template.bind({})
Filterable.args = {
  label: "Option auswählen",
  options:
    '["Aeugst am Albis", "Affoltern am Albis", "Bonstetten", "Hausen am Albis", "Hedingen", "Kappel am Albis", "Knonau", "Maschwanden", "Mettmenstetten", "Obfelden", "Ottenbach", "Rifferswil", "Stallikon", "Wettswil am Albis", "Benken (ZH)", "Berg am Irchel", "Buch am Irchel", "Dachsen", "Dorf", "Feuerthalen", "Flaach", "Flurlingen", "Henggart", "Kleinandelfingen", "Laufen-Uhwiesen", "Marthalen", "Ossingen", "Rheinau", "Thalheim an der Thur", "Trüllikon", "Truttikon", "Volken", "Bachenbülach", "Bassersdorf", "Bülach", "Dietlikon", "Eglisau", "Embrach", "Freienstein-Teufen", "Glattfelden", "Hochfelden", "Höri", "Hüntwangen", "Kloten", "Lufingen", "Nürensdorf", "Oberembrach", "Opfikon", "Rafz", "Rorbas", "Wallisellen", "Wasterkingen", "Wil (ZH)", "Winkel", "Bachs", "Boppelsen", "Buchs (ZH)", "Dällikon", "Dänikon", "Dielsdorf", "Hüttikon", "Neerach", "Niederglatt", "Niederhasli", "Niederweningen", "Oberglatt", "Oberweningen", "Otelfingen", "Regensberg", "Regensdorf", "Rümlang", "Schleinikon", "Schöfflisdorf", "Stadel", "Steinmaur", "Weiach", "Bäretswil", "Bubikon", "Dürnten", "Fischenthal", "Gossau (ZH)", "Grüningen", "Hinwil", "Rüti (ZH)", "Seegräben", "Wald (ZH)", "Wetzikon (ZH)", "Adliswil", "Kilchberg (ZH)", "Langnau am Albis", "Oberrieden", "Richterswil", "Rüschlikon", "Thalwil", "Erlenbach (ZH)", "Herrliberg", "Hombrechtikon", "Küsnacht (ZH)", "Männedorf", "Meilen", "Oetwil am See", "Stäfa", "Uetikon am See", "Zumikon", "Zollikon", "Fehraltorf", "Hittnau", "Lindau", "Pfäffikon", "Russikon", "Weisslingen", "Wila", "Wildberg", "Dübendorf", "Egg", "Fällanden", "Greifensee", "Maur", "Mönchaltorf", "Schwerzenbach", "Uster", "Volketswil", "Wangen-Brüttisellen", "Altikon", "Brütten", "Dägerlen", "Dättlikon", "Dinhard", "Ellikon an der Thur", "Elsau", "Hagenbuch", "Hettlingen", "Neftenbach", "Pfungen", "Rickenbach (ZH)", "Schlatt (ZH)", "Seuzach", "Turbenthal", "Winterthur", "Zell (ZH)", "Aesch (ZH)", "Birmensdorf (ZH)", "Dietikon", "Geroldswil", "Oberengstringen", "Oetwil an der Limmat", "Schlieren", "Uitikon", "Unterengstringen", "Urdorf", "Weiningen (ZH)", "Zürich", "Andelfingen", "Stammheim", "Wädenswil", "Elgg", "Horgen", "Illnau-Effretikon", "Bauma", "Wiesendangen"]',
  value: null,
  clearable: true,
  disabled: false,
  filterable: true,
}

/* I also tried sloting the before and after. It doesn't work because the blur event is triggered everytime a slot is clicked */
export const BeforeAfterSlot = Template.bind({})
BeforeAfterSlot.args = {
  label: "Option auswählen",
  options:
    '["Aeugst am Albis", "Affoltern am Albis", "Bonstetten", "Hausen am Albis", "Hedingen", "Kappel am Albis", "Knonau", "Maschwanden", "Mettmenstetten", "Obfelden", "Ottenbach", "Rifferswil", "Stallikon", "Wettswil am Albis", "Benken (ZH)", "Berg am Irchel", "Buch am Irchel", "Dachsen", "Dorf", "Feuerthalen", "Flaach", "Flurlingen", "Henggart", "Kleinandelfingen", "Laufen-Uhwiesen", "Marthalen", "Ossingen", "Rheinau", "Thalheim an der Thur", "Trüllikon", "Truttikon", "Volken", "Bachenbülach", "Bassersdorf", "Bülach", "Dietlikon", "Eglisau", "Embrach", "Freienstein-Teufen", "Glattfelden", "Hochfelden", "Höri", "Hüntwangen", "Kloten", "Lufingen", "Nürensdorf", "Oberembrach", "Opfikon", "Rafz", "Rorbas", "Wallisellen", "Wasterkingen", "Wil (ZH)", "Winkel", "Bachs", "Boppelsen", "Buchs (ZH)", "Dällikon", "Dänikon", "Dielsdorf", "Hüttikon", "Neerach", "Niederglatt", "Niederhasli", "Niederweningen", "Oberglatt", "Oberweningen", "Otelfingen", "Regensberg", "Regensdorf", "Rümlang", "Schleinikon", "Schöfflisdorf", "Stadel", "Steinmaur", "Weiach", "Bäretswil", "Bubikon", "Dürnten", "Fischenthal", "Gossau (ZH)", "Grüningen", "Hinwil", "Rüti (ZH)", "Seegräben", "Wald (ZH)", "Wetzikon (ZH)", "Adliswil", "Kilchberg (ZH)", "Langnau am Albis", "Oberrieden", "Richterswil", "Rüschlikon", "Thalwil", "Erlenbach (ZH)", "Herrliberg", "Hombrechtikon", "Küsnacht (ZH)", "Männedorf", "Meilen", "Oetwil am See", "Stäfa", "Uetikon am See", "Zumikon", "Zollikon", "Fehraltorf", "Hittnau", "Lindau", "Pfäffikon", "Russikon", "Weisslingen", "Wila", "Wildberg", "Dübendorf", "Egg", "Fällanden", "Greifensee", "Maur", "Mönchaltorf", "Schwerzenbach", "Uster", "Volketswil", "Wangen-Brüttisellen", "Altikon", "Brütten", "Dägerlen", "Dättlikon", "Dinhard", "Ellikon an der Thur", "Elsau", "Hagenbuch", "Hettlingen", "Neftenbach", "Pfungen", "Rickenbach (ZH)", "Schlatt (ZH)", "Seuzach", "Turbenthal", "Winterthur", "Zell (ZH)", "Aesch (ZH)", "Birmensdorf (ZH)", "Dietikon", "Geroldswil", "Oberengstringen", "Oetwil an der Limmat", "Schlieren", "Uitikon", "Unterengstringen", "Urdorf", "Weiningen (ZH)", "Zürich", "Andelfingen", "Stammheim", "Wädenswil", "Elgg", "Horgen", "Illnau-Effretikon", "Bauma", "Wiesendangen"]',
  clearable: true,
  disabled: false,
  before: "<div>before</div>",
  after: '<div>after <input type="test"></input></div>',
  filterable: false,
  multiple: true,
}

export const Multiple = Template.bind({})
Multiple.args = {
  label: "Option auswählen",
  options:
    '["Aeugst am Albis", "Affoltern am Albis", "Bonstetten", "Hausen am Albis", "Hedingen", "Kappel am Albis", "Knonau", "Maschwanden", "Mettmenstetten", "Obfelden", "Ottenbach", "Rifferswil", "Stallikon", "Wettswil am Albis", "Benken (ZH)", "Berg am Irchel", "Buch am Irchel", "Dachsen", "Dorf", "Feuerthalen", "Flaach", "Flurlingen", "Henggart", "Kleinandelfingen", "Laufen-Uhwiesen", "Marthalen", "Ossingen", "Rheinau", "Thalheim an der Thur", "Trüllikon", "Truttikon", "Volken", "Bachenbülach", "Bassersdorf", "Bülach", "Dietlikon", "Eglisau", "Embrach", "Freienstein-Teufen", "Glattfelden", "Hochfelden", "Höri", "Hüntwangen", "Kloten", "Lufingen", "Nürensdorf", "Oberembrach", "Opfikon", "Rafz", "Rorbas", "Wallisellen", "Wasterkingen", "Wil (ZH)", "Winkel", "Bachs", "Boppelsen", "Buchs (ZH)", "Dällikon", "Dänikon", "Dielsdorf", "Hüttikon", "Neerach", "Niederglatt", "Niederhasli", "Niederweningen", "Oberglatt", "Oberweningen", "Otelfingen", "Regensberg", "Regensdorf", "Rümlang", "Schleinikon", "Schöfflisdorf", "Stadel", "Steinmaur", "Weiach", "Bäretswil", "Bubikon", "Dürnten", "Fischenthal", "Gossau (ZH)", "Grüningen", "Hinwil", "Rüti (ZH)", "Seegräben", "Wald (ZH)", "Wetzikon (ZH)", "Adliswil", "Kilchberg (ZH)", "Langnau am Albis", "Oberrieden", "Richterswil", "Rüschlikon", "Thalwil", "Erlenbach (ZH)", "Herrliberg", "Hombrechtikon", "Küsnacht (ZH)", "Männedorf", "Meilen", "Oetwil am See", "Stäfa", "Uetikon am See", "Zumikon", "Zollikon", "Fehraltorf", "Hittnau", "Lindau", "Pfäffikon", "Russikon", "Weisslingen", "Wila", "Wildberg", "Dübendorf", "Egg", "Fällanden", "Greifensee", "Maur", "Mönchaltorf", "Schwerzenbach", "Uster", "Volketswil", "Wangen-Brüttisellen", "Altikon", "Brütten", "Dägerlen", "Dättlikon", "Dinhard", "Ellikon an der Thur", "Elsau", "Hagenbuch", "Hettlingen", "Neftenbach", "Pfungen", "Rickenbach (ZH)", "Schlatt (ZH)", "Seuzach", "Turbenthal", "Winterthur", "Zell (ZH)", "Aesch (ZH)", "Birmensdorf (ZH)", "Dietikon", "Geroldswil", "Oberengstringen", "Oetwil an der Limmat", "Schlieren", "Uitikon", "Unterengstringen", "Urdorf", "Weiningen (ZH)", "Zürich", "Andelfingen", "Stammheim", "Wädenswil", "Elgg", "Horgen", "Illnau-Effretikon", "Bauma", "Wiesendangen"]',
  value: "[]",
  clearable: true,
  disabled: false,
  filterable: true,
  multiple: true,
}

export const MultipleFilled = Template.bind({})
MultipleFilled.args = {
  label: "Option auswählen",
  options:
    '["Aeugst am Albis", "Affoltern am Albis", "Bonstetten", "Hausen am Albis", "Hedingen", "Kappel am Albis", "Knonau", "Maschwanden", "Mettmenstetten", "Obfelden", "Ottenbach", "Rifferswil", "Stallikon", "Wettswil am Albis", "Benken (ZH)", "Berg am Irchel", "Buch am Irchel", "Dachsen", "Dorf", "Feuerthalen", "Flaach", "Flurlingen", "Henggart", "Kleinandelfingen", "Laufen-Uhwiesen", "Marthalen", "Ossingen", "Rheinau", "Thalheim an der Thur", "Trüllikon", "Truttikon", "Volken", "Bachenbülach", "Bassersdorf", "Bülach", "Dietlikon", "Eglisau", "Embrach", "Freienstein-Teufen", "Glattfelden", "Hochfelden", "Höri", "Hüntwangen", "Kloten", "Lufingen", "Nürensdorf", "Oberembrach", "Opfikon", "Rafz", "Rorbas", "Wallisellen", "Wasterkingen", "Wil (ZH)", "Winkel", "Bachs", "Boppelsen", "Buchs (ZH)", "Dällikon", "Dänikon", "Dielsdorf", "Hüttikon", "Neerach", "Niederglatt", "Niederhasli", "Niederweningen", "Oberglatt", "Oberweningen", "Otelfingen", "Regensberg", "Regensdorf", "Rümlang", "Schleinikon", "Schöfflisdorf", "Stadel", "Steinmaur", "Weiach", "Bäretswil", "Bubikon", "Dürnten", "Fischenthal", "Gossau (ZH)", "Grüningen", "Hinwil", "Rüti (ZH)", "Seegräben", "Wald (ZH)", "Wetzikon (ZH)", "Adliswil", "Kilchberg (ZH)", "Langnau am Albis", "Oberrieden", "Richterswil", "Rüschlikon", "Thalwil", "Erlenbach (ZH)", "Herrliberg", "Hombrechtikon", "Küsnacht (ZH)", "Männedorf", "Meilen", "Oetwil am See", "Stäfa", "Uetikon am See", "Zumikon", "Zollikon", "Fehraltorf", "Hittnau", "Lindau", "Pfäffikon", "Russikon", "Weisslingen", "Wila", "Wildberg", "Dübendorf", "Egg", "Fällanden", "Greifensee", "Maur", "Mönchaltorf", "Schwerzenbach", "Uster", "Volketswil", "Wangen-Brüttisellen", "Altikon", "Brütten", "Dägerlen", "Dättlikon", "Dinhard", "Ellikon an der Thur", "Elsau", "Hagenbuch", "Hettlingen", "Neftenbach", "Pfungen", "Rickenbach (ZH)", "Schlatt (ZH)", "Seuzach", "Turbenthal", "Winterthur", "Zell (ZH)", "Aesch (ZH)", "Birmensdorf (ZH)", "Dietikon", "Geroldswil", "Oberengstringen", "Oetwil an der Limmat", "Schlieren", "Uitikon", "Unterengstringen", "Urdorf", "Weiningen (ZH)", "Zürich", "Andelfingen", "Stammheim", "Wädenswil", "Elgg", "Horgen", "Illnau-Effretikon", "Bauma", "Wiesendangen"]',
  value: '["Aeugst am Albis", "Affoltern am Albis"]',
  clearable: true,
  disabled: false,
  filterable: true,
  multiple: true,
}
