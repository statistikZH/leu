# Changelog

## 0.0.1 (2023-11-14)


### ⚠ BREAKING CHANGES

* **select:** change optionFilter (rename) from a reactive property to internal state
* **select:** The value property is not a string anymore but an array.
* **button:** change negative to inverted to get a consistent API between components

### Features

* add button-group ([#37](https://github.com/statistikZH/leu/issues/37)) ([fd5d170](https://github.com/statistikZH/leu/commit/fd5d170ee2b26e785556c7b5e7e3e65a099a6e13))
* add HasSlotController which helps to identify if a slot has content ([bc7581e](https://github.com/statistikZH/leu/commit/bc7581e66bf836aabefec19a6717a7016ae552c8))
* add select component ([58409af](https://github.com/statistikZH/leu/commit/58409af450911bbee273e2223bdb9749c63207ac))
* add size,comments and update twitter ([2e1ae9b](https://github.com/statistikZH/leu/commit/2e1ae9b2d8c35a897436792be52b2a1aa5a94f22))
* add table ([624016a](https://github.com/statistikZH/leu/commit/624016a11e2649735f5eb0d00e9a3a112b35f484))
* **button:** add fluid option to take up full width of the parent container ([3e066b2](https://github.com/statistikZH/leu/commit/3e066b2f4d66cec810051b4e3b58cff9dc7efc34))
* **button:** add ghost variant ([f397503](https://github.com/statistikZH/leu/commit/f397503ad39c43e7e92e64e08a8a140859f40929))
* **button:** Implement LeuButton component ([aa26a1a](https://github.com/statistikZH/leu/commit/aa26a1a30b1f390e4f695bcd469f943372a334f9))
* **chip:** Implement chip components ([971cb4b](https://github.com/statistikZH/leu/commit/971cb4bc2f863172fbfc29ec92526a1e3ca5169a))
* define global box-shadow styles ([24753ba](https://github.com/statistikZH/leu/commit/24753ba18b84a57f03e0307622727971110882ba))
* define viewports as a preperation for postcss ([#17](https://github.com/statistikZH/leu/issues/17)) ([e11a819](https://github.com/statistikZH/leu/commit/e11a819b6e7666b60a568f540ccccadaee00d972))
* **dropdown:** add basic dropdown component ([6896b46](https://github.com/statistikZH/leu/commit/6896b46a4f3a0c48c9645e52020f227ce5125ae9))
* **input:** add error attribute to display server side errors ([#40](https://github.com/statistikZH/leu/issues/40)) ([1ba3a6f](https://github.com/statistikZH/leu/commit/1ba3a6f23c471d18e9147d2a4a791b9c83d5d477))
* **input:** implement text input component ([5815327](https://github.com/statistikZH/leu/commit/5815327124c838ede90297ed38731aae3dc19c17))
* **menu-item:** add an EMPTY icon option to align the label with other items that have an icon ([d7c3fa1](https://github.com/statistikZH/leu/commit/d7c3fa13121022175e9f954be6c1318235a1c360))
* **menu-item:** add disabled attribute/property ([f150a17](https://github.com/statistikZH/leu/commit/f150a17a8c4897b3c520925739ad270c27b51f4f))
* **menu-item:** add highlighted property/attribute as a way to set a style similiar to hover ([f150a17](https://github.com/statistikZH/leu/commit/f150a17a8c4897b3c520925739ad270c27b51f4f))
* **menu:** create menu component abstraction ([6896b46](https://github.com/statistikZH/leu/commit/6896b46a4f3a0c48c9645e52020f227ce5125ae9))
* **pagination:** implement pagination component ([0b3c11f](https://github.com/statistikZH/leu/commit/0b3c11fcaf1946ddf11688407e0cd0e133d5b519))
* **select:** reimplement and simplify the select element with a dialog element ([f150a17](https://github.com/statistikZH/leu/commit/f150a17a8c4897b3c520925739ad270c27b51f4f))


### Bug Fixes

* **button:** use same border-radius value as other input elements do ([d88ca25](https://github.com/statistikZH/leu/commit/d88ca2533fd1d3442f85cb5b5f438128349d3b0a))
* correct filename for button export ([16b04d0](https://github.com/statistikZH/leu/commit/16b04d02ef94898f6b0d9eff6440bacc9eaec69f))
* **Pagination:** remove comment of page property ([21c73e6](https://github.com/statistikZH/leu/commit/21c73e622a9fb8ee7161ba6b7c647a08568e3ec5))
* **select:** remove unnecessary function call ([4f9c6e5](https://github.com/statistikZH/leu/commit/4f9c6e5e09f393f1bf0d9b19c77ced87dfa12eff))
* **select:** use fluid option to use the available space ([a0e2eb4](https://github.com/statistikZH/leu/commit/a0e2eb4813c311b8f399c1436f5d116912de8b79))
* **select:** use the correct name of the close method ([a24fd0b](https://github.com/statistikZH/leu/commit/a24fd0b1e5473ca1a928dac7a0f62d86c2ad3a32))
* **theme:** reference the font styles on our server ([611afd0](https://github.com/statistikZH/leu/commit/611afd06703b98628dbe604efcf8e2936b9d7a67))


### Miscellaneous Chores

* release 0.0.1 ([198ce36](https://github.com/statistikZH/leu/commit/198ce364513f7aaecc39db1dc27d7254de22658e))


### Code Refactoring

* **button:** change negative to inverted to get a consistent API between components ([0970036](https://github.com/statistikZH/leu/commit/0970036926324e1f0660e550d884df2e35309ec9))
* **select:** change optionFilter (rename) from a reactive property to internal state ([a51e0b8](https://github.com/statistikZH/leu/commit/a51e0b8ed08f7d1de9a8e8c89762d9b674e95691))
* **select:** change the type of the value property to an array ([5772d2d](https://github.com/statistikZH/leu/commit/5772d2de37d5e4e7dacbc186332746681d73ed73))
