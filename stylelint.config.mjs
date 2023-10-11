export default {
  extends: "stylelint-config-standard",
  overrides: [
    {
      files: ["*.js"],
      customSyntax: "postcss-lit",
    },
  ],
  rules: {
    // Disable empty line rules because we want to group related properties
    // and want to separate them with empty lines.
    "custom-property-empty-line-before": null,
    "declaration-empty-line-before": null,
    // Allowing kebab-case and an optional leading underscore
    "custom-property-pattern": "^_?([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
    // Allowing kebab-case and BEM
    "selector-class-pattern":
      "^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$",
  },
  ignoreFiles: ["scripts/generate-component/templates/**/*"],
}
