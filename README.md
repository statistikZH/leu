![](stat_zh.png)

# 🦁 leu

A UI component library based on the [design system](https://www.zh.ch/de/webangebote-entwickeln-und-gestalten.html) of the canton of zurich.

## ⚠️ This project is still in alpha state

This package is still in alpha state. It is not recommended to use it in production yet.

## Prerequisites

Node.js > v18.0.0

## Installation

```bash
npm i @statistikzh/leu
```

## Usage

In order for the components to work, you need to load the theme styles and the font definitions globally.
The theme file is part of the package (`dist/theme.css`).
The fonts on the other hand have to be licensed and are therefore not included in the package.

If you have an environment that resolves bare module imports, you can use the library like this:

```html
<link rel="stylesheet" href="@statistikzh/leu/theme.css" />
<script type="module">
  import "@statistikzh/leu/leu-input.js"
</script>

<leu-input></leu-input>
```

### CDN

Browsers can't resolve bare module imports without import maps. But we can use a CDN to resolve the imports for us.
This is useful if you're just using plain HTML and JavaScript without any build or transformation steps.
Also this is applicable in an environment like [Observable](https://observablehq.com).

```html
<link
  rel="stylesheet"
  href="https://esm.run/@statistikzh/leu@0.1/dist/theme.css"
/>
<script type="module">
  import "https://esm.run/@statistikzh/leu@0.1/dist/leu-input.js"
</script>

<leu-input></leu-input>
```

## Linting and formatting

To scan the project for linting and formatting errors, run

```bash
npm run lint
```

To automatically fix linting and formatting errors, run

```bash
npm run format
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```

## Demoing with Storybook

To run a local instance of Storybook for your component, run

```bash
npm run storybook
```

To build a production version of Storybook, run

```bash
npm run storybook:build
```

## Create a new component

To create a starting point for a new component, run

```bash
./scripts/generate-component/generate.js
```

Running it with `--help` will show you all available options.

## Development guidelines

A few rules are necessary when developing a component library. The following conventions and guidelines should be followed when new features are implemented.

At the same time they're not set in stone. If the there is a good reason to change them open a pull request.

### Naming

Every element or custom property that will be globally available has to be prefixed with `leu`.

```js
/* Custom elements */
class LeuRadio extends LeuElement {
  ...
}

window.customElements.define("leu-input", LeuInput)
```

```css
/* CSS custom property of the theme */
:root {
  --leu-color-black-0: #000;
}
```

### Scoped styles

All CSS declarations have to live inside a custom element. This way we ensure that the styles won't interfere with the environment they're loaded into.
Styles that are shared between components should be defined as global custom properties inside the `styles/custom-properties.css`.
When a global custom property is used inside a component it could be a good practice to assign them to a local custom property with a semantic naming.
This only make a sense when the component has a certain complexity and the global custom property are used multiple times.

```css
:host {
  --radio-color-disabled: var(--leu-color-black-20);
}
```

### Value property

All custom elements that contain a value of some sort have to implement a `value` property.
Everytime the value of the `value` property changes a `input` event has to be dispatched.
This behaviour matches the way [Observable](https://observablehq.com) handles and observes changes of values that are contained in arbitrary elements. We decided to take over this pattern as it is usable in every other environment too.

### Custom events

In case of a custom event that is meant to be catched by an other component of this library, the name of this event has to be prefixed too.

```js
this.dispatchEvent(new Event("leu:select", { bubbles: true, composed: true }))
```

### Dependencies

Use as little dependencies as possible and as many as needed.

## Contributors

Thanks to the following people who have contributed to this project

[@cubmic](https://github.com/cubmic) <br>
[@resmartiZH](https://github.com/resmartiZH) <br>
[@daenub](https://github.com/daenub) <br>

## Contact

Dan Büschlen <br>
dan.bueschlen@statistik.ji.zh.ch <br>

## License

This project uses the following license: <br>

- Code license: [Copyright (c) <2024> <Statistisches Amt Kanton Zürich>](LICENSE)

## Guidelines for contributing

We welcome contributions. Please see our [CONTRIBUTING.md](CONTRIBUTING.md) file for detailed guidelines of how to contribute.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
