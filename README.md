# 🦁 leu

A library of reusable UI components based on the [design system](https://www.zh.ch/de/webangebote-entwickeln-und-gestalten.html) of the canton of zurich.

## Installation

```bash
npm i @statistikzh/leu
```

## Usage

```html
<script type="module">
  import "@statistikzh/leu/leu-radio.js"
</script>

<leu-radio></leu-radio>
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

## Tooling configs

For most of the tools, the configuration is in the `package.json` to minimize the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Naming conventions

Every element, class or custom property that will be globally available has to be prefixed with `leu`.

```js
/* Custom elements */
class LeuRadio extends LitElement {
  ...
}

window.customElements.define("leu-input", LeuInput)
```

```css
/* CSS class */
.leu-radio-group {
  ...
}

/* CSS custom property */
:root {
  --leu-color-black-0: #000;
}
```


