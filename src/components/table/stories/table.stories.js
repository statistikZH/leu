import { html, nothing } from "lit"
import "../leu-table.js"
import { Icon } from "../../icon/icon.js"

export default {
  title: "Table",
  component: "leu-table",
}

function Template({ columns, data, firstColumnSticky }) {
  return html`
    <leu-table
      .columns=${columns}
      .data=${data}
      ?firstColumnSticky=${firstColumnSticky}
    >
    </leu-table>
  `
}

export const Regular = Template.bind({})
Regular.args = {
  columns: [
    { name: "Id", value: (row) => row.id },
    { name: "Name", value: (row) => row.name },
    { name: "Menge", value: (row) => row.menge },
  ],
  data: [
    { id: 1, name: "Apfel", menge: 4 },
    { id: 2, name: "Birne", menge: 2 },
    { id: 3, name: "Banane", menge: 3 },
    { id: 4, name: "Orange", menge: 7 },
  ],
}

export const WithStyle = Template.bind({})
WithStyle.args = {
  columns: [
    { name: "Id", value: (row) => row.id },
    {
      name: "Name",
      style: (row) => {
        const color =
          row.menge > 2
            ? "var(--leu-color-accent-turquoise)"
            : "var(--leu-color-accent-bordeaux)"
        return { color }
      },
      value: (row) => row.name,
    },
    { name: "Menge", value: (row) => row.menge },
  ],
  data: [
    { id: 1, name: "Apfel", menge: 4 },
    { id: 2, name: "Birne", menge: 2 },
    { id: 3, name: "Banane", menge: 3 },
  ],
}

function arrow(row) {
  if (row.plus > 0) {
    return html`${row.plus} ${Icon("arrowUp", 20)}`
  }
  if (row.plus < 0) {
    return html`${row.plus} ${Icon("arrowDown", 20)}`
  }
  return nothing
}

export const WithOtherElements = Template.bind({})
WithOtherElements.args = {
  columns: [
    { name: "Id", value: (row) => row.id },
    { name: "Name", value: (row) => row.name },
    { name: "Menge", value: (row) => row.menge },
    {
      name: "+/-",
      style: (row) => {
        const color =
          row.menge > 2
            ? "var(--leu-color-accent-turquoise)"
            : "var(--leu-color-accent-bordeaux)"
        return { color, textAlign: "right" }
      },
      value: arrow,
    },
  ],
  data: [
    { id: 1, name: "Apfel", icon: "floppy", menge: 4, plus: 0 },
    { id: 2, name: "Birne", icon: "home", menge: 2, plus: -2 },
    { id: 3, name: "Banane", icon: "email", menge: 3, plus: 3 },
    { id: 4, name: "Orange", icon: "twitter", menge: 7, plus: 1 },
  ],
}

export const WithSort = Template.bind({})
WithSort.args = {
  columns: [
    {
      name: "Id",
      value: (row) => row.id,
      sort: {
        asc: (rowA, rowB) => rowA.id - rowB.id,
        desc: (rowA, rowB) => rowB.id - rowA.id,
      },
    },
    {
      name: "Name",
      value: (row) => row.name,
      sort: {
        asc: (rowA, rowB) => rowA.name.localeCompare(rowB.name),
        desc: (rowA, rowB) => rowB.name.localeCompare(rowA.name),
      },
    },
    {
      name: "Menge",
      value: (row) => row.menge,
      sort: {
        asc: (rowA, rowB) => rowA.menge - rowB.menge,
        desc: (rowA, rowB) => rowB.menge - rowA.menge,
      },
    },
  ],
  data: [
    { id: 1, name: "Apfel", menge: 4 },
    { id: 2, name: "Birne", menge: 2 },
    { id: 3, name: "Banane", menge: 3 },
  ],
}

export const Overflow = Template.bind({})
Overflow.args = {
  columns: [
    { name: "Id", value: (row) => row.id },
    {
      name: "Name",
      style: (_) => {
        const minWidth = "800px"
        return { minWidth }
      },
      value: (row) => row.name,
    },
    { name: "Menge", value: (row) => row.menge },
  ],
  data: [
    { id: 1, name: "Apfel", menge: 4 },
    { id: 2, name: "Birne", menge: 2 },
    {
      id: 3,
      name: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      menge: 3,
    },
  ],
}

export const OverflowWithSticky = Template.bind({})
OverflowWithSticky.args = {
  firstColumnSticky: true,
  columns: [
    { name: "Id", value: (row) => row.id },
    {
      name: "Name",
      style: (_) => {
        const minWidth = "800px"
        return { minWidth }
      },
      value: (row) => row.name,
    },
    { name: "Menge", value: (row) => row.menge },
  ],
  data: [
    { id: 1, name: "Apfel", menge: 4 },
    { id: 2, name: "Birne", menge: 2 },
    {
      id: 3,
      name: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      menge: 3,
    },
  ],
}
