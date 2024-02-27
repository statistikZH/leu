#!/usr/bin/env node

import fs from "fs/promises"
import { get } from "http"
import path from "path"

function getPixelValue(value) {
  return parseInt(value.replace("px", ""), 10)
}

const stylesString = await fs.readFile(
  path.join(process.cwd(), "src/styles/font-definitions.json"),
  "utf-8"
)

const styles = JSON.parse(stylesString)

function generateFontStyles({
  identifier,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
}) {
  const customPropertyPrefix = `--leu-t-${identifier}-${fontWeight}`

  const varFontSize = `${customPropertyPrefix}-font-size`
  const varLineHeight = `${customPropertyPrefix}-line-height`
  const varSpacing = `${customPropertyPrefix}-spacing`
  const varFont = `${customPropertyPrefix}-font`
  const varFontFamily = `--leu-font-family-${fontWeight}`

  return [
    `${varFontSize}: ${fontSize / 16}rem;`,
    `${varLineHeight}: ${lineHeight};`,
    `${varSpacing}: ${spacing}rem;`,
    `${varFont}: var(${varFontSize}) / var(${varLineHeight}) var(${varFontFamily});`,
  ]
}

const css = styles.definitions.flatMap((style) => {
  const fontSize = getPixelValue(style["font-size"])
  const fontWeights = Array.isArray(style["font-weight"])
    ? style["font-weight"]
    : [style["font-weight"]]
  const lineHeight = style["line-height"]
  const spacing = getPixelValue(style.spacing) / 16

  const identifier = (fontSize / 4) * 10

  return fontWeights.flatMap((fontWeight) =>
    generateFontStyles({
      identifier,
      fontSize,
      fontWeight,
      lineHeight,
      spacing,
    })
  )
})

console.log(css)

function mediaQuery(minWidth, styles) {
  return `@media (min-width: ${minWidth}px) {
    ${styles}
  }`
}

function curveStepStyles(curvePrefix, fontStyle) {
  return [
    `${curvePrefix}-font-size`,
    `${curvePrefix}-line-height`,
    `${curvePrefix}-spacing`,
    `${curvePrefix}-font`,
  ]
}

styles.curves.forEach((curve, curveIndex) => {
  const identifier = (curveIndex + 1) * 100 // TODO: should be the identifier of the last step
  const curvePrefix = `--leu-t-${identifier}`

  curve.steps.forEach((step, stepIndex) => {
    const [minWidth, fontStyle] = step

    return stepIndex === 0
      ? curveStepStyles(curvePrefix, fontStyle)
      : mediaQuery(minWidth, curveStepStyles(curvePrefix, fontStyle))
  })
})
