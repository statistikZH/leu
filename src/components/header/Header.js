import { html, LitElement } from "lit"
import { styleMap } from "lit/directives/style-map.js"

/** @ts-ignore */
import headerStyles from "./header.css"
/** @ts-ignore */
import gridStyles from "../../styles/grid.css"
/** @ts-ignore */
import headingsStyles from "../../styles/headings.css"

// links:
// top topics chip: https://www.zh.ch/de/gesundheit.html
// breadcrumb collapse: https://www.zh.ch/de/gesundheit/lebensmittel-gebrauchsgegenstaende/lebensmittel/trinkwasser.html
// inverted: https://www.zh.ch/de/webangebote-entwickeln-und-gestalten/inhalt/designsystem/design-grundlagen/logos.zhweb-noredirect.zhweb-cache.html?node-id=21161%3A183597

const HEADER_COLORS = [
  "blue",
  "darkblue",
  "turquoise",
  "green",
  "bordeaux",
  "magenta",
  "violet",
  "gray",
  "white",
]
Object.freeze(HEADER_COLORS)
export { HEADER_COLORS }

/**
 * @tagname leu-header
 */
export class LeuHeader extends LitElement {
  static styles = [gridStyles, headingsStyles, headerStyles]

  static properties = {
    backgroundColor: { type: String },
  }

  constructor() {
    super()
    /** @type {"blue" | "darkblue" | "turquoise" | "green" | "bordeaux" | "magenta" | "violet" | "gray" | "white"} */
    this.backgroundColor = "white"
  }

  renderLogo() {
    return html`
      <a href="https://www.zh.ch/de.html">
        <img
          class="logo"
          src="src/components/header/KTZH-Logo-Flagge-${this.backgroundColor ===
          "white"
            ? "Positiv"
            : "Negativ"}.svg"
          alt="Logo des Kantons Zürich"
        />
      </a>
    `
  }

  render() {
    const headerStyle = styleMap({
      background:
        this.backgroundColor === "white"
          ? "#fff"
          : `var(--leu-color-accent-${this.backgroundColor})`,
      color: this.backgroundColor === "white" ? "#000" : "#fff",
    })

    // load shared css with link element: https://lamplightdev.com/blog/2021/03/23/how-to-share-styles-in-the-shadow-dom/
    return html`
      <header class="header" style="${headerStyle};">
        <div class="lyt-wrapper">
          <!-- icon & title -->
          <div class="grid-x grid-margin-x">
            <div
              class="logo-container cell tiny-2 xsmall-2 small-2 medium-2 large-2 xlarge-2"
            >
              ${this.renderLogo()}
            </div>
            <div
              class="cell tiny-10 xsmall-10 small-10 medium-10 large-10 xlarge-10"
            >
              <div class="breadcrumbs">
                <slot name="breadcrumbs"></slot>
              </div>
              <h1 class="title">
                <slot name="title"></slot>
              </h1>
            </div>
          </div>

          <!-- heading -->
          <div class="grid-x grid-margin-x">
            <div
              class="cell xsmall-offset-2 small-offset-2 medium-offset-2 large-offset-2 xlarge-offset-2 xsmall-auto small-auto medium-9 large-8 xlarge-8"
            >
              <slot class="chips" name="chips"></slot>
              <slot name="lead" class="slot"> </slot>
            </div>
          </div>
        </div>
      </header>
    `
  }
}
