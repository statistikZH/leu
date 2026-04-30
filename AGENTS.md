# AGENTS.md - AI Coding Assistant Guide

This file provides guidance for AI coding assistants when working with this repository.

## Project Overview

`leu` is a framework-agnostic web components library implementing the design system of the Canton of Zurich. Components are built with [Lit](https://lit.dev) and extend a shared `LeuElement` base class.

## Repo Structure

```
src/
├── components/   # Individual web components (one folder per component)
├── lib/          # Shared base class (LeuElement), mixins, and utilities
├── styles/       # Global CSS theme (theme.css)
├── docs/         # Documentation source files
└── index.ts      # Public barrel export
scripts/
└── generate-component/  # Scaffolding script for new components
```

Each component folder (e.g. `src/components/button/`) typically contains:

- `Button.ts` — component class
- `leu-button.ts` — custom element registration
- `button.css` — component styles (imported as `?inline` in the class)
- `stories/` — Storybook stories
- `test/` — unit tests

## Essential Commands

All commands run from the repo root.

```bash
npm run storybook        # Start Storybook dev server on http://localhost:8080
npm run build            # Full production build (JS + CSS + CEM analysis)
npm run build:js         # TypeScript → JS via tsdown
npm run build:css        # PostCSS theme build
npm run lint             # ESLint + Prettier check
npm run lint:types       # TypeScript type check
npm run format           # Auto-fix ESLint + Prettier
npm run test             # Run all tests with coverage
npm run test:watch       # Run tests in watch mode
npm run analyze          # Regenerate custom-elements.json manifest
```

## Build & Test Flow

**Build:** `npm run build` compiles TypeScript (`tsdown`), builds the CSS theme, and regenerates the custom elements manifest. Check types without building: `npm run lint:types`.

**Tests** use Web Test Runner with Playwright. Test files match `src/components/**/*.test.ts`.

Run tests for a single component:

```bash
npm run test -- --files "src/components/button/**/*.test.ts"
```

**Running a single test case:** Use `.only` to isolate a failing test, then remove it before committing:

```ts
it.only("should render correctly", () => {
```

**Important:** Only run tests for the component being modified, not the full suite, unless validating a cross-cutting change.

## Component Development

A new component can be scaffolded using the provided script:

```bash
# Learn how to use the generator:
npm run generate-component -- --help
# Create a single component:
npm run generate-component -- --name button
# For multiple components that live in the same folder (e.g. menu + menu-item):
npm run generate-component -- --name menu --components menu,menu-item
```

### Naming Conventions

- Class name: `LeuButton` (PascalCase, `Leu` prefix)
- Tag name: `leu-button` (kebab-case, `leu-` prefix)
- File names: `Button.ts`, `leu-button.ts`, `button.css`

### Component Structure

Components extend `LeuElement` (which extends `LitElement`):

```ts
import { LeuElement } from "../../lib/LeuElement.js"
import styles from "./button.css?inline"

export class LeuButton extends LeuElement {
  static styles = [LeuElement.styles, styles]

  // Use Lit decorators for properties
  @property({ type: String, reflect: true })
  variant: "primary" | "secondary" | "ghost" = "primary"
}
```

Register the custom element in a separate file:

```ts
// leu-button.ts
import { LeuButton } from "./Button.js"
customElements.define("leu-button", LeuButton)
```

Export from `src/index.ts` (both the class and the registration module).

### Styles

All component styles should be based on the global theme variables defined in `src/styles/theme.css`.

### Key Patterns

| Topic            | Convention                                                                |
| ---------------- | ------------------------------------------------------------------------- |
| Styles           | Import CSS as `?inline`, include `LeuElement.styles` first                |
| Slots            | Manage with `HasSlotController` from `lib/hasSlotController.ts`           |
| Form fields      | Extend `FormAssociatedMixin(LeuElement)`                                  |
| Sub-dependencies | Declare via static `dependencies` object; auto-registered by `LeuElement` |
| Figma reference  | Link in JSDoc `@see` on the class                                         |

## Commit Message Format

Follow [Conventional Commits](https://conventionalcommits.org) (enforced by commitlint):

```
<type>(<scope>): <description>

[body]

[footer]
```

**Types:** `fix`, `feat`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `revert`
**Scope:** Component name without prefix (e.g., `button`, `input`, `dialog`)

Example: `feat(radio): add new feature`

## Branching

Branch off `main`. Prefix branch names with the issue number (e.g. `48-dropdown`). Do not merge feature branches into each other; merge into `main` as soon as possible.
Branches will be squashed on merge, so the commit history should be clean and focused on the change.

```
fix(button): correct focus outline on tab key

The button now receives proper focus outline when
navigating with the tab key.

Fixes #42
```

## GitHub Actions & Releases

Never update the `CHANGELOG.md` or version number manually. The release process is automated via GitHub Actions:

1. Merge your PR into `main` with a properly formatted commit message.
