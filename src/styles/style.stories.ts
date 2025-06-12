import { html } from "lit"

export default {
  title: "Components/Layout",
}

function Template() {
  return html` <style>
      .container {
        display: grid;
        grid-template-columns: var(--leu-grid-template-columns);
        gap: var(--leu-grid-gap);
        max-width: var(--leu-grid-max-width);

        margin: 0 auto;
        padding: 1rem;

        background-color: var(--leu-color-black-5);
        font-family: var(--leu-font-family-regular);
        font-feature-settings: var(--leu-t-font-feature-settings);
      }

      .container div {
        background-color: var(--leu-color-black-transp-5);
        padding: 1rem;
      }
    </style>
    <div class="container">
      <div style="grid-column-end: span 12;">
        <p>
          This story demonstrates the use of the predefined grid custom
          properties. It is not a component that can be reused.
        </p>
      </div>
      <div style="grid-column: var(--leu-grid-columns-full)">
        <pre>--leu-grid-columns-full</pre>
        <p>A preset to use the full width of the grid</p>
      </div>
      <div style="grid-column: var(--leu-grid-columns-offset)">
        <pre>--leu-grid-columns-offset</pre>
        <p>
          A preset that indents the content by two columns starting at the
          regular breakpoint. On smaller breakpoints it will use the full width.
        </p>
      </div>

      ${[
        [2, 2, 2, 2, 2, 2],
        [3, 3, 3, 3],
        [4, 4, 4],
        [6, 6],
      ]
        .flat()
        .map(
          (columns) =>
            html`<div style="grid-column-end: span ${columns}">
              ${columns}
            </div>`,
        )}
    </div>`
}

export const Regular = Template.bind({})
Regular.args = {}
