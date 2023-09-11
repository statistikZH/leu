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

## Development guidelines

A few rules are necessary when developing a component library. The following conventions and guidelines should be followed when new features are implemented.

At the same time they're not set in stone. If the there is a good reason to change them open a pull request.

### Naming

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
  ...;
}

/* CSS custom property */
:root {
  --leu-color-black-0: #000;
}
```

### Scoped styles

All CSS declarations should, whenever possible, always live inside a custom element. This way we ensure that the styles won't interfere with the environment they're loaded into.
The only exceptions are `@font-face` statements and custom property declarations.
Styles that are shared between components should be defined as global custom properties inside the `styles/custom-properties.css`.
When a global custom property is used inside a component it should always be assigned to a local custom property in the `:host` declaration block.

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
this.dispatchEvent(new Event("leu-selected", { bubbles: true, composed: true }))
```

### Dependencies

Use as little dependencies as possible and as many as needed.
