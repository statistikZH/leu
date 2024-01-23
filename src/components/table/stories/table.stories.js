import { html } from "lit"
import "../leu-table.js"

export default {
  title: "Table",
  component: "leu-table",
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/d6Pv21UVUbnBs3AdcZijHmbN/KTZH-Design-System?type=design&node-id=316-2445&mode=design&t=lzVrtq8lxYVJU5TB-11",
    },
  },
}

function Template({ itemsPerPage }) {
  return html`
    <leu-table id="table" itemsPerPage=${itemsPerPage}></leu-table>
    <script>
      {
        const table = document.querySelector("leu-table[id=table]")
        table.columns = [
          {
            name: "Id",
            value: (row) => row.id,
          },
          {
            name: "Name",
            value: (row) => row.name,
            style: (row) => {
              return {
                minWidth: "400px",
              }
            },
            sort: {
              asc: (rowA, rowB) => rowA.name.localeCompare(rowB.name),
              desc: (rowA, rowB) => rowB.name.localeCompare(rowA.name),
            },
          },
          {
            name: "Menge",
            value: (row) => row.menge,
            style: (row) => {
              return {
                color:
                  row.menge > 10
                    ? "var(--leu-color-func-green)"
                    : "var(--leu-color-func-red)",
              }
            },
            sort: {
              asc: (rowA, rowB) => rowA.menge - rowB.menge,
              desc: (rowA, rowB) => rowB.menge - rowA.menge,
            },
          },
        ]
        table.data = [
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
        ]
      }
    </script>
  `
}

export const Regular = Template.bind({})
Regular.argTypes = {
  itemsPerPage: { type: "number" },
  columns: { table: { disable: true } },
  data: { table: { disable: true } },
  _columns: { table: { disable: true } },
  _data: { table: { disable: true } },
  _min: { table: { disable: true } },
  _max: { table: { disable: true } },
  _shadowLeft: { table: { disable: true } },
  _shadowRight: { table: { disable: true } },
  _sortArrowDown: { table: { disable: true } },
  _sortArrowUp: { table: { disable: true } },
  _scrollRef: { table: { disable: true } },
  _itemsPerPage: { table: { disable: true } },
  _sortedData: { table: { disable: true } },
}
Regular.args = {
  itemsPerPage: null,
}

export const Pagination = Template.bind({})
Pagination.args = {
  itemsPerPage: 10,
}
