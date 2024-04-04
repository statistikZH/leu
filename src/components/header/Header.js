import { html, LitElement, nothing } from "lit"
import { unsafeHTML } from "lit/directives/unsafe-html.js"
import { styleMap } from "lit/directives/style-map.js"

import styles from "./header.css"
import "../chip/leu-chip-link.js"
import "../breadcrumb/leu-breadcrumb.js"

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
  static styles = styles

  static properties = {
    pageTitle: { type: String },
    subtitle: { type: String },
    breadcrumb: { type: Array },
    topTopics: { type: Array },
    color: { type: String },
  }

  constructor() {
    super()
    /** @type {Array} */
    this.breadcrumb = null
    /** @type {string} */
    this.subtitle = null
    /** @type {Array} */
    this.topTopics = null
    /** @type {string} */
    this.color = "white"
  }

  renderTopTopics() {
    return html`
      <div class="toptopics">
        <h2>Top Themen</h2>
        <ul>
          ${this.topTopics.map(
            (topic) =>
              html`
                <li>
                  <leu-chip-link inverted href=${topic.href}>
                    ${topic.label}
                  </leu-chip-link>
                </li>
              `
          )}
        </ul>
      </div>
    `
  }

  renderLead() {
    return html` <p class="lead">${this.subtitle}</p> `
  }

  renderLogo() {
    return html`
      <a href="https://www.zh.ch/de.html">
        <img
          class="logo"
          src="src/components/header/KTZH-Logo-Flagge-${this.color === "white"
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
        this.color === "white"
          ? "#fff"
          : `var(--leu-color-accent-${this.color})`,
      color: this.color === "white" ? "#000" : "#fff",
    })

    // load shared css with link element: https://lamplightdev.com/blog/2021/03/23/how-to-share-styles-in-the-shadow-dom/
    return html`
      <link rel="stylesheet" href="src/styles/grid.css" />
      <link rel="stylesheet" href="src/styles/headings.css" />
      <header style="${headerStyle};">
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
              <div class="breadcrumb">
                <leu-breadcrumb
                  .items=${this.breadcrumb}
                  ?inverted=${this.color !== "white"}
                >
                </leu-breadcrumb>
              </div>
              <h1 class="atm-heading title">${unsafeHTML(this.pageTitle)}</h1>
            </div>
          </div>

          <!-- heading -->
          <div class="grid-x grid-margin-x">
            <div
              class="cell xsmall-offset-2 small-offset-2 medium-offset-2 large-offset-2 xlarge-offset-2 xsmall-auto small-auto medium-9 large-8 xlarge-8"
            >
              ${this.topTopics ? this.renderTopTopics() : nothing}
              ${this.subtitle ? this.renderLead() : nothing}
            </div>
          </div>
        </div>
      </header>
    `
  }
}
