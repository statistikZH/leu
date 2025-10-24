import { html } from "lit"
import { styleMap } from "lit/directives/style-map.js"
import { ifDefined } from "lit/directives/if-defined.js"
import "../leu-popup.js"
import "../../button/leu-button.js"

export default {
  title: "Components/Popup",
  component: "leu-popup",
  argTypes: {
    placement: {
      control: {
        type: "select",
      },
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
    },
  },
}

const popupStyles = {
  background: "white",
  border: "1px solid var(--leu-color-black-40)",
  padding: "0.5rem",
  boxShadow: "var(--leu-box-shadow-regular)",
}

function Template(args = {}) {
  return html`<leu-popup
    ?active=${args.active}
    ?flip=${args.flip}
    ?shift=${args.shift}
    placement=${ifDefined(args.placement)}
  >
    <leu-button slot="anchor">Open popup</leu-button>
    <div style=${styleMap(popupStyles)}>Popup content</div>
  </leu-popup>`
}

export const Regular = Template.bind({})
Regular.args = {
  active: true,
  placement: "bottom-start",
  flip: true,
  shift: true,
}

export const VirtualElement = {
  render: (args = {}) => html`
    <leu-popup
      ?active=${args.active}
      ?flip=${args.flip}
      ?shift=${args.shift}
      placement=${ifDefined(args.placement)}
    >
      <div style=${styleMap(popupStyles)}>Popup content</div>
    </leu-popup>
    <script>
      const body = document.body
      const popup = document.querySelector("leu-popup")
      let clientX = 0
      let clientY = 0

      body.style.height = "100vh"

      popup.anchor = {
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            top: clientY,
            left: clientX,
            right: clientX,
            bottom: clientY,
          }
        },
      }

      body.addEventListener("mousemove", (event) => {
        clientX = event.clientX
        clientY = event.clientY

        popup.reposition()
      })
    </script>
  `,
  args: {
    active: true,
    placement: "bottom-start",
    flip: true,
    shift: true,
  },
}
