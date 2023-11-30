# Changelog

## [0.3.0](https://github.com/statistikZH/leu/compare/v0.2.0...v0.3.0) (2023-11-30)


### Features

* refactor component properties to include reflection ([#69](https://github.com/statistikZH/leu/issues/69)) ([cf2992b](https://github.com/statistikZH/leu/commit/cf2992b7c9af76a9e966cae7e4e35f288a155c89))


### Bug Fixes

* **checkbox:** remove tabIndex allocation because the property is not used by the component anymore ([4999754](https://github.com/statistikZH/leu/commit/4999754c363bfa996db9c00233845f1f3bab95e5))
* **radio:** remove tabIndex allocation because the property is not used by the component anymore ([abc9c85](https://github.com/statistikZH/leu/commit/abc9c858e2575600bc3d71a74daf87b333ef509c))

## [0.2.0](https://github.com/statistikZH/leu/compare/v0.1.0...v0.2.0) (2023-11-28)


### Features

* **accordion:** implement accordion component ([b962d2c](https://github.com/statistikZH/leu/commit/b962d2c51aa17dbb909e8cbcb9ed0436d1b4b84d))
* **input:** move focus into the input field after clearing the value ([#55](https://github.com/statistikZH/leu/issues/55)) ([ec92026](https://github.com/statistikZH/leu/commit/ec9202689ba2997570531c272162be1da54dc156))
* **select:** add a more specific label if no options are available ([#57](https://github.com/statistikZH/leu/issues/57)) ([9ed62bf](https://github.com/statistikZH/leu/commit/9ed62bf5eb847c0814a92ff6066313eedf32b44a))
* **select:** close the select element if a click happens outside of the element ([#58](https://github.com/statistikZH/leu/issues/58)) ([b2df185](https://github.com/statistikZH/leu/commit/b2df18537acc294552984eb539706400305564bb))


### Bug Fixes

* **input:** delegate focus to the actual input field ([ee9b21d](https://github.com/statistikZH/leu/commit/ee9b21de69322b1ebc822ab3a2f3bfb1a0ba6572))
* **menu:** enforce styles of the hr element with important as they are part of the light dom ([d6d7a3f](https://github.com/statistikZH/leu/commit/d6d7a3f1a2182854747908cf142678f352e1e014))
* **select:** actually set the filter input ref and use the correct attribute ([ee9b21d](https://github.com/statistikZH/leu/commit/ee9b21de69322b1ebc822ab3a2f3bfb1a0ba6572))
* **theme:** fix a typo inside the hex notation ([82a6961](https://github.com/statistikZH/leu/commit/82a6961ae44c93826f6d97924a845f4d418b8f3b))

## [0.1.0](https://github.com/statistikZH/leu/compare/v0.0.2...v0.1.0) (2023-11-15)


### Features

* use the transform class property babel plugin for the build ([e582230](https://github.com/statistikZH/leu/commit/e582230ac52bb74babd32cd2a83acea0a3cdd44e))


### Bug Fixes

* build all the available components ([f7c27c5](https://github.com/statistikZH/leu/commit/f7c27c53396c0f46f27285f6e1f529d43dc35588))

## [0.0.2](https://github.com/statistikZH/leu/compare/v0.0.1...v0.0.2) (2023-11-15)


### Miscellaneous Chores

* release 0.0.2 ([4371479](https://github.com/statistikZH/leu/commit/437147901d5406f8fe23750a2b3fa3575bdb272f))

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
