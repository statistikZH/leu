const path = require("path")
const fs = require("fs/promises")

/* Plugin logic */

function getPixelValue(value) {
  return parseInt(value.replace("px", ""), 10)
}

async function parseFile(file) {
  const string = await fs.readFile(file, "utf-8")

  return JSON.parse(string)
}

function generateCustomPropertyDeclarations({
  name,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
}) {
  const customPropertyPrefix = `--leu-t-${name}-${fontWeight}`

  const varFontSize = `${customPropertyPrefix}-font-size`
  const varLineHeight = `${customPropertyPrefix}-line-height`
  const varSpacing = `${customPropertyPrefix}-spacing`
  const varFont = `${customPropertyPrefix}-font`
  const varFontFamily = `--leu-font-family-${fontWeight}`

  return [
    { type: "fontSize", name: varFontSize, value: `${fontSize / 16}rem` },
    { type: "lineHeight", name: varLineHeight, value: `${lineHeight}` },
    { type: "spacing", name: varSpacing, value: `${spacing}rem` },
    {
      type: "font",
      name: varFont,
      value: `normal var(${varFontSize}) / var(${varLineHeight}) var(${varFontFamily})`,
    },
  ]
}

function curveStepDeclarations(curvePrefix, stepStyle) {
  const fontSizeVar = stepStyle.declarations.find(
    (s) => s.type === "fontSize",
  ).name
  const lineHeightVar = stepStyle.declarations.find(
    (s) => s.type === "lineHeight",
  ).name
  const spacingVar = stepStyle.declarations.find(
    (s) => s.type === "spacing",
  ).name
  const fontVar = stepStyle.declarations.find((s) => s.type === "font").name

  return [
    { prop: `${curvePrefix}-font-size`, value: ` var(${fontSizeVar})` },
    { prop: `${curvePrefix}-line-height`, value: ` var(${lineHeightVar})` },
    { prop: `${curvePrefix}-spacing`, value: ` var(${spacingVar})` },
    { prop: `${curvePrefix}-font`, value: ` var(${fontVar})` },
  ]
}

/**
 *
 * @param {*} file
 * @param {import('postcss')} postcss
 * @param {import('postcss').Source} nodeSource
 * @returns
 */
async function createLeuFontStyleNodes(file, postcss, nodeSource) {
  const { definitions, curves } = await parseFile(file)

  const fontStyleDeclarations = definitions.flatMap((style) => {
    const fontSize = getPixelValue(style.fontSize)
    const fontWeights = Array.isArray(style.fontWeight)
      ? style.fontWeight
      : [style.fontWeight]
    const spacing = getPixelValue(style.spacing) / 16

    return fontWeights.map((fontWeight) => ({
      name: style.name,
      fontWeight,
      declarations: generateCustomPropertyDeclarations({
        name: style.name,
        fontSize,
        fontWeight,
        lineHeight: style.lineHeight,
        spacing,
      }),
    }))
  })

  const fontStyleNodes = fontStyleDeclarations.flatMap((style) =>
    style.declarations.map(
      ({ name, value }) =>
        new postcss.Declaration({ prop: name, value, source: nodeSource }),
    ),
  )

  const curveNodes = curves.flatMap((curve) =>
    curve.weights.flatMap((fontWeight) => {
      const curvePrefix = `--leu-t-curve-${curve.name}-${fontWeight}`

      return curve.steps.flatMap((step) => {
        const [viewport, styleName] = step

        const stepStyle = fontStyleDeclarations.find(
          (s) => s.name === styleName && s.fontWeight === fontWeight,
        )

        const nodes = curveStepDeclarations(curvePrefix, stepStyle).map(
          ({ prop, value }) =>
            new postcss.Declaration({ prop, value, source: nodeSource }),
        )

        return viewport === null
          ? nodes
          : new postcss.AtRule({
              name: "media",
              params: `(${viewport})`,
              nodes,
              source: nodeSource,
            })
      })
    }),
  )

  return [...fontStyleNodes, ...curveNodes]
}

/* Plugin config */

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => ({
  postcssPlugin: "leu-font-styles",
  AtRule: {
    "leu-font-styles": async (atRule, postcss) => {
      const rootDir = path.dirname(atRule.source.input.file)
      const jsonFile = atRule.params.replace(/['"]+/g, "")

      const nodes = await createLeuFontStyleNodes(
        path.resolve(rootDir, jsonFile),
        postcss,
        atRule.source,
      )

      atRule.replaceWith(nodes)
    },
  },
})

module.exports.postcss = true
