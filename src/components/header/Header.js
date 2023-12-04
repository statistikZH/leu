import { html, LitElement, nothing } from "lit"
import { defineElement } from "../../lib/defineElement.js"
import styles from "./header.css"
import grid from "./grid.css"
import headings from "./headings.css"
import { defineChipLinkElements } from "../chip/ChipLink.js"

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
  static styles = [styles, grid, headings]

  static properties = {
    breadcrumb: { type: Array },
    subtitle: { type: String },
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

  get headerStyle() {
    return `
      background:${
        this.color === "white"
          ? "#fff"
          : `var(--leu-color-accent-${this.color})`
      };
      color:${this.color === "white" ? "#000" : "#fff"};
    `
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
    return html`
      <header style="${this.headerStyle};">
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
              <div class="breadcrumb">TODO: Breadcrumb here</div>
              <h1 class="atm-heading title">${this.title}</h1>
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

export function defineHeaderElements() {
  defineChipLinkElements()
  defineElement("header", LeuHeader)
}
