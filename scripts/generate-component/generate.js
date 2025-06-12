#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-use-before-define */

import arg from "arg"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const fsPromises = fs.promises
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const namespace = "leu"
const Namespace = "Leu"

const printHelp = () => {
  console.log(`
  Usage: ./scripts/generate-component/generate.js [options]

  Options:
    -n, --name        Name of the component directory, camel-case (required)
    -c, --components  List of components to generate, camel-case (optional, defaults to name)
    -h, --help        Print this help message

  Example:
    ./scripts/generate-component/generate.js --name radio --components radio,radio-button
    ./scripts/generate-component/generate.js -n select
  `)
}

const upperCamelCase = (str) =>
  str
    .split("-")
    .map((chunk) => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join("")

const makeFolder = async (dir) => {
  if (dir !== "." && !fs.existsSync(dir)) {
    await fsPromises.mkdir(dir)
  }
}

const formatTemplateFileContents = (replacements, content) => {
  // replace all instances of [name], [Name], [namespace] and [Namespace] accordingly
  let result = content
  for (let i = 0; i < replacements.length; i += 1) {
    const { regex, value } = replacements[i]
    result = result.replace(regex, value)
  }
  return result
}

const getReplacements = async ({ name }) => {
  // name to lower-kebab-case (e.g. Text Input -> text-input)
  // const lowerKebabCaseName = lowerKebabCase(name)
  // name to UpperCamelCase (e.g. text-input -> TextInput)
  const upperCamelCaseName = upperCamelCase(name)

  return [
    { regex: /\[name\]/g, value: name },
    { regex: /\[namespace\]/g, value: namespace },
    { regex: /\[Namespace\]/g, value: Namespace },
    { regex: /\[Name\]/g, value: upperCamelCaseName },
  ]
}

const copyFile = async (sourcePath, targetPath, params, replacements) => {
  const stats = await fsPromises.stat(sourcePath)
  if (stats.isDirectory()) {
    await makeFolder(targetPath)
    await copyAllFiles(sourcePath, targetPath, params)
  } else if (stats.isFile()) {
    const templateFileContents = await fsPromises.readFile(sourcePath, {
      encoding: "utf8",
    })
    const formattedTemplateFileContents = formatTemplateFileContents(
      replacements,
      templateFileContents,
    )
    await fsPromises.writeFile(targetPath, formattedTemplateFileContents, {
      encoding: "utf8",
    })

    if (params.verbose) {
      console.log(`Copied: ${sourcePath} -> ${targetPath}`)
    }
  }
}

const copyAllFiles = async (sourcePath, targetPath, params) => {
  const fileNames = await fsPromises.readdir(sourcePath)
  const fileCopyPromises = []
  const replacements = await getReplacements(params)
  fileNames.forEach((fileName) => {
    const newFileName = formatTemplateFileContents(replacements, fileName)

    console.log(`Creating: ${targetPath}/${newFileName}`)

    fileCopyPromises.push(
      copyFile(
        `${sourcePath}/${fileName}`,
        `${targetPath}/${newFileName}`,
        params,
        replacements,
      ),
    )
  })
  await Promise.all(fileCopyPromises)
}

const generate = async () => {
  const args = arg({
    "--help": Boolean,
    "--name": String,
    "--components": String,
    "-n": "--name",
    "-c": "--components",
  })

  if (args["--help"]) {
    printHelp()
    process.exit(0)
  }

  if (!args["--name"]) {
    console.log("Please provide a name for your component.")
    process.exit(1)
  }

  const name = args["--name"]
  const components = args["--components"]
    ? args["--components"].split(",").map((component) => component.trim())
    : [name]

  const kebabCaseRegex = /^[a-z]+(-[a-z]+)*$/

  if (![name].concat(components).every((c) => kebabCaseRegex.test(c))) {
    console.log(
      "The name and the components have to be in camel case and can only contain [a-z] letters.",
    )
    console.log("Example: radio-group")
    process.exit(1)
  }

  const destinationPath = path.join(process.cwd(), `src/components/${name}`)
  const templatesPath = path.join(__dirname, "templates")

  if (fs.existsSync(destinationPath)) {
    console.log(`The component ${name} already exists.`)
    process.exit(1)
  }

  await makeFolder(destinationPath)

  const copyPromises = components.map(async (component) =>
    copyAllFiles(templatesPath, destinationPath, {
      name: component,
      Name: upperCamelCase(component),
      namespace,
      Namespace,
    }),
  )

  await Promise.all(copyPromises)
}

await generate()
