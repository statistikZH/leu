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
      itemsOnAPage="5"
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

export const Pagination = Template.bind({})
Pagination.args = {
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
    { id: 1, name: "Ananas", menge: 7 },
    { id: 2, name: "Apfel", menge: 12 },
    { id: 3, name: "Aprikose", menge: 3 },
    { id: 4, name: "Banare", menge: 11 },
    { id: 5, name: "Birne", menge: 10 },
    { id: 6, name: "Brombeere", menge: 5 },
    { id: 7, name: "Cranberries", menge: 3 },
    { id: 8, name: "Datteln", menge: 2 },
    { id: 9, name: "Erdbeere", menge: 0 },
    { id: 10, name: "Feige", menge: 11 },
    { id: 11, name: "Granatapfel", menge: 14 },
    { id: 12, name: "Grapefruit", menge: 7 },
    { id: 13, name: "Heidelbeere", menge: 12 },
    { id: 14, name: "Himbeere", menge: 3 },
    { id: 15, name: "Johannisbeere", menge: 11 },
    { id: 16, name: "Kirsche", menge: 10 },
    { id: 17, name: "Kiwi", menge: 5 },
    { id: 18, name: "Limette", menge: 3 },
    { id: 19, name: "Litschi", menge: 2 },
    { id: 20, name: "Mandarine", menge: 0 },
    { id: 21, name: "Mango", menge: 11 },
    { id: 22, name: "Melone", menge: 14 },
    { id: 23, name: "Mirabelle", menge: 14 },
    { id: 24, name: "Nashi", menge: 12 },
    { id: 25, name: "Orange", menge: 3 },
    { id: 26, name: "Papaya", menge: 6 },
    { id: 27, name: "Pfirsich", menge: 5 },
    { id: 28, name: "Pflaume", menge: 17 },
    { id: 29, name: "Physalis", menge: 1 },
    { id: 30, name: "Preiselbeere", menge: 19 },
    { id: 31, name: "Pomelo", menge: 12 },
    { id: 32, name: "Quitte", menge: 0 },
    { id: 33, name: "Rhabarber", menge: 1 },
    { id: 34, name: "Sanddorn", menge: 2 },
    { id: 35, name: "Stachelbeere", menge: 19 },
    { id: 36, name: "Ugli", menge: 9 },
    { id: 37, name: "Weintraube", menge: 11 },
    { id: 38, name: "Zitrone", menge: 4 },
    { id: 39, name: "Zwetschge", menge: 20 },
  ],
}
