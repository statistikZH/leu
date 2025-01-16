# Changelog

## [0.13.1](https://github.com/statistikZH/leu/compare/v0.13.0...v0.13.1) (2025-01-16)


### Bug Fixes

* **button:** set fixed height to the ghost variant so it doesn't change when adding an icon ([c2d94cb](https://github.com/statistikZH/leu/commit/c2d94cb282687770ab477893a0731f1fcbf8ebdf))
* **chip:** prevent cut of the descender of the lables of small sized chips ([#259](https://github.com/statistikZH/leu/issues/259)) ([08f5365](https://github.com/statistikZH/leu/commit/08f5365f82c80227613a09ebe287c5e40d63027d))
* **dropdown,icon,popup:** don't create a inline or a block box ([c2d94cb](https://github.com/statistikZH/leu/commit/c2d94cb282687770ab477893a0731f1fcbf8ebdf))
* export LeuElement ([68603d4](https://github.com/statistikZH/leu/commit/68603d42e4c169df8772b803bafb6e88d9dfe441))
* **select:** add missing background color ([c4d5117](https://github.com/statistikZH/leu/commit/c4d5117a7c2ba9748a2e123a1dcf47dee619f3b0))

## [0.13.0](https://github.com/statistikZH/leu/compare/v0.12.2...v0.13.0) (2025-01-08)


### Features

* **table:** add align prop for columns and hover effect ([#254](https://github.com/statistikZH/leu/issues/254)) ([56d9d4d](https://github.com/statistikZH/leu/commit/56d9d4dfa3fb080bf4de340a88aa7e2437f6942f))

## [0.12.2](https://github.com/statistikZH/leu/compare/v0.12.1...v0.12.2) (2024-12-05)


### Bug Fixes

* **input:** define an explicit height for small sized input ([b25bedb](https://github.com/statistikZH/leu/commit/b25bedb7aa85cc798e571faa4ad32c4ef6bb14f2))

## [0.12.1](https://github.com/statistikZH/leu/compare/v0.12.0...v0.12.1) (2024-12-04)


### Bug Fixes

* **input:** define explicit height of native input field to ensure consistent height of the element ([63527d8](https://github.com/statistikZH/leu/commit/63527d86c1e311fccefd2c2dcff50bcd2d6d6ed7))

## [0.12.0](https://github.com/statistikZH/leu/compare/v0.11.1...v0.12.0) (2024-12-02)


### Features

* add headerStyle function ([#248](https://github.com/statistikZH/leu/issues/248)) ([385f3ea](https://github.com/statistikZH/leu/commit/385f3ea003735216e1c0227d7dfd64e7c33e67b7))

## [0.11.1](https://github.com/statistikZH/leu/compare/v0.11.0...v0.11.1) (2024-11-25)


### Bug Fixes

* :bug: implemented font-feature-settings for all components ([#243](https://github.com/statistikZH/leu/issues/243)) ([4ce502f](https://github.com/statistikZH/leu/commit/4ce502f51e1387d83d5ec8fdea56cc692f4631c4))
* fixed transition animation in accordion to match zhweb ([#245](https://github.com/statistikZH/leu/issues/245)) ([11950f1](https://github.com/statistikZH/leu/commit/11950f14220ee0b2e6315188e453b817f0f528ba))

## [0.11.0](https://github.com/statistikZH/leu/compare/v0.10.0...v0.11.0) (2024-10-07)


### Features

* **range:** implement range element ([2a87ed0](https://github.com/statistikZH/leu/commit/2a87ed0095e67b6e01dbc888f151e36cb82ad44d))

## [0.10.0](https://github.com/statistikZH/leu/compare/v0.9.0...v0.10.0) (2024-09-12)


### Features

* add dialog component ([805be86](https://github.com/statistikZH/leu/commit/805be868585a1ee59a45bf1d7facd0886596906c))
* **layout:** add reusable grid definitions as custom properties ([#233](https://github.com/statistikZH/leu/issues/233)) ([4e7367c](https://github.com/statistikZH/leu/commit/4e7367c6eab1ba93037fed2b7ee6de1b3b7c51c3))
* **theme:** add font feature settings as a custom property ([#237](https://github.com/statistikZH/leu/issues/237)) ([0fc5c5f](https://github.com/statistikZH/leu/commit/0fc5c5ffca3f90e5b61ec992ad6fa28fa9cfc755))
* **typography:** add regular curves and use 'official' curve names ([#231](https://github.com/statistikZH/leu/issues/231)) ([0f29fb6](https://github.com/statistikZH/leu/commit/0f29fb61ffa6df0ab21c159398a53534075fe454))


### Bug Fixes

* **input:** define a explicit background for the whole element ([#236](https://github.com/statistikZH/leu/issues/236)) ([ff1c899](https://github.com/statistikZH/leu/commit/ff1c89910c9502d0bd439f087aea3419323f0f8f))

## [0.9.0](https://github.com/statistikZH/leu/compare/v0.8.0...v0.9.0) (2024-07-24)


### Features

* **menu-item:** add multipleSelection property to display a check icon ([#227](https://github.com/statistikZH/leu/issues/227)) ([02358cc](https://github.com/statistikZH/leu/commit/02358ccf5de5cb714adefc8de90d8f799dc58692))
* **spinner:** implement spinner animation element ([ba6257e](https://github.com/statistikZH/leu/commit/ba6257e6f46c021767f90384eaac19e203517b0d))
* **theme:** add :host pseudo class so that the theme can be used in a shadow root ([#221](https://github.com/statistikZH/leu/issues/221)) ([66e4676](https://github.com/statistikZH/leu/commit/66e4676be80ac79a137452d1f57d51394d3f4146))
* use new zh web typeface inter ([#224](https://github.com/statistikZH/leu/issues/224)) ([820deca](https://github.com/statistikZH/leu/commit/820deca357889fa11ac145ae0f203e2137c97a15))


### Bug Fixes

* **button:** remove border to match sizes of the design system ([#223](https://github.com/statistikZH/leu/issues/223)) ([9fa2cbb](https://github.com/statistikZH/leu/commit/9fa2cbbf919e02f71a150b974bc97563a75048c0))
* **checkbox:** avoid 'undefined' values and fallback to an empty string ([2f9f95f](https://github.com/statistikZH/leu/commit/2f9f95f50b56469a5ade01d4b5f5816a858028e3))
* **dropdown:** properly handle the document click events when the element is used in a shadow dom ([0c6c5a9](https://github.com/statistikZH/leu/commit/0c6c5a915b136f8fdbad300f719bb852d09fe220))
* **radio:** avoid 'undefined' values and fallback to an empty string ([2f9f95f](https://github.com/statistikZH/leu/commit/2f9f95f50b56469a5ade01d4b5f5816a858028e3))
* **select:** properly handle the document click events when the element is used in a shadow dom ([0c6c5a9](https://github.com/statistikZH/leu/commit/0c6c5a915b136f8fdbad300f719bb852d09fe220))

## [0.8.0](https://github.com/statistikZH/leu/compare/v0.7.0...v0.8.0) (2024-07-16)


### Features

* **chip:** add getValue method that returns either the value or the text content of the chip ([78eb332](https://github.com/statistikZH/leu/commit/78eb332e6b0da18cfdff45cbd9f3e7cc9514b9ea))


### Bug Fixes

* **checkbox-group:** use lowercase values for orientation attribute ([da68c5e](https://github.com/statistikZH/leu/commit/da68c5e68683e8672712c1bd36134df2eabc4cfb))
* don't define dependencies in the constructor. add version variable for better comparison ([14eda96](https://github.com/statistikZH/leu/commit/14eda96dcbdcd86124a4e42a9a32d472b44416db))
* **menu-item:** apply correct active colors to match style guide and to be wcag compliant ([#211](https://github.com/statistikZH/leu/issues/211)) ([1f8e957](https://github.com/statistikZH/leu/commit/1f8e95749ae4faaf87fce29924ba5b35724f8e4d))
* **menu-item:** use textContent instead of innerText to avoid triggering a reflow ([78eb332](https://github.com/statistikZH/leu/commit/78eb332e6b0da18cfdff45cbd9f3e7cc9514b9ea))
* **radio-group:** use lowercase values for orientation attribute ([da68c5e](https://github.com/statistikZH/leu/commit/da68c5e68683e8672712c1bd36134df2eabc4cfb))

## [0.7.0](https://github.com/statistikZH/leu/compare/v0.6.0...v0.7.0) (2024-07-08)


### Features

* **chip-group:** implement value setter ([dd1557a](https://github.com/statistikZH/leu/commit/dd1557ab1063ec7421a74057c489529b26e6d805))
* **input:** add inputAsNumber getter that matches the native inputs method with the same name ([552f1ff](https://github.com/statistikZH/leu/commit/552f1ff18680c6a2866c7813fe40c462ea834802))


### Bug Fixes

* **chip-group:** handle the chip children during the event capture phase ([552f1ff](https://github.com/statistikZH/leu/commit/552f1ff18680c6a2866c7813fe40c462ea834802))
* **radio-group:** handle the radio children during the event capture phase ([552f1ff](https://github.com/statistikZH/leu/commit/552f1ff18680c6a2866c7813fe40c462ea834802))

## [0.6.0](https://github.com/statistikZH/leu/compare/v0.5.1...v0.6.0) (2024-07-01)


### Features

* **icon:** create an icon element ([0a8351c](https://github.com/statistikZH/leu/commit/0a8351c123c987572c2e187f492bf3a35ac53f27))
* **icon:** render a placeholder if the name of the icon is unknown or not set ([a7dae7c](https://github.com/statistikZH/leu/commit/a7dae7c318fd791ca1a0095487fe6ced64b51023))
* **menu-item:** implement getValue method ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))
* **menu-item:** use hover and highlighted styling for focus too ([78c3e68](https://github.com/statistikZH/leu/commit/78c3e6898a5ec4e88a13e698aca6f6caef653645))
* **menu:** avoid captured key events from navigating the whole page ([#191](https://github.com/statistikZH/leu/issues/191)) ([c40fc4e](https://github.com/statistikZH/leu/commit/c40fc4e4efbeafe3f30469adec1033484112e0d6))
* **menu:** implement roving tab index ([78c3e68](https://github.com/statistikZH/leu/commit/78c3e6898a5ec4e88a13e698aca6f6caef653645))
* **menu:** move all focus handling to the menu component ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))
* register dependency elements not before the dependent element ([4dfddcd](https://github.com/statistikZH/leu/commit/4dfddcd80e47bee5e047b3eee203d72e0e9d8fba))
* **select:** always close the popup when focus leaves the element ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))
* **select:** set max height of the menu ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))
* **select:** use arrow buttons to navigate to listbox from the text input field ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))


### Bug Fixes

* buttons should inherit font-family ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))
* **button:** set aria-expanded on the actual interactive element ([78c3e68](https://github.com/statistikZH/leu/commit/78c3e6898a5ec4e88a13e698aca6f6caef653645))
* **dropdown:** replace hardcoded icon with a slot ([#189](https://github.com/statistikZH/leu/issues/189)) ([8954616](https://github.com/statistikZH/leu/commit/895461661a6b31a08868c166f3ed9474baed9a79))
* **icon:** mark icon as presentational so it won't be announced by screen readers ([#186](https://github.com/statistikZH/leu/issues/186)) ([5d3d427](https://github.com/statistikZH/leu/commit/5d3d427c8c856a0b01f9dfc9568065e64f2653fa))
* **icon:** remove faulty paths ([0a8351c](https://github.com/statistikZH/leu/commit/0a8351c123c987572c2e187f492bf3a35ac53f27))
* **input:** avoid overlap by hiding the label ([#182](https://github.com/statistikZH/leu/issues/182)) ([d4edc51](https://github.com/statistikZH/leu/commit/d4edc51a812f27a35e8ed2cb86df872dd91d2874))
* **menu-item:** allow disabled menu items to still be focusable ([78c3e68](https://github.com/statistikZH/leu/commit/78c3e6898a5ec4e88a13e698aca6f6caef653645))
* **menu-item:** apply tab-index to the actual interactive element ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))
* **menu-item:** only add aria attribute to the button element ([78c3e68](https://github.com/statistikZH/leu/commit/78c3e6898a5ec4e88a13e698aca6f6caef653645))
* **menu-item:** remove deprecated properties before and after ([78c3e68](https://github.com/statistikZH/leu/commit/78c3e6898a5ec4e88a13e698aca6f6caef653645))
* **menu-item:** use colors that are WCAG AA compliant ([5c59899](https://github.com/statistikZH/leu/commit/5c598990a40cd138bf47b1e0bf2c9026da1f4d87))
* **menu:** only add role when no role was defined before ([78c3e68](https://github.com/statistikZH/leu/commit/78c3e6898a5ec4e88a13e698aca6f6caef653645))
* **popup:** define a z-index value for the popup content ([#184](https://github.com/statistikZH/leu/issues/184)) ([72ec681](https://github.com/statistikZH/leu/commit/72ec68109589759b5887f159a4df42ee265b4b65))
* **popup:** reflect properties to attributes ([#200](https://github.com/statistikZH/leu/issues/200)) ([44aec79](https://github.com/statistikZH/leu/commit/44aec79a8e8456240771da214d45440cc31891d7))
* **radio:** remove label property as it is not used anymore ([e105a6e](https://github.com/statistikZH/leu/commit/e105a6eec33392d5bddf0d32e9881375576597d6))
* **select:** add background to apply button ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))
* **select:** move leu-menu element into the shadow dom so the role is fully controlled ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))
* **select:** only call focus if the element is available ([5c59899](https://github.com/statistikZH/leu/commit/5c598990a40cd138bf47b1e0bf2c9026da1f4d87))
* **select:** set correct aria attributes ([9846e87](https://github.com/statistikZH/leu/commit/9846e8709a81afce6074860fb597e42f394582d9))

## [0.5.1](https://github.com/statistikZH/leu/compare/v0.5.0...v0.5.1) (2024-05-23)


### Bug Fixes

* **button:** truncate the label instead of wrapping it ([4118c0b](https://github.com/statistikZH/leu/commit/4118c0b117532615c5254d6849d8740ef43cb30f))
* **dropdown:** limit button width to allow the label to be truncated ([4118c0b](https://github.com/statistikZH/leu/commit/4118c0b117532615c5254d6849d8740ef43cb30f))

## [0.5.0](https://github.com/statistikZH/leu/compare/v0.4.0...v0.5.0) (2024-05-02)


### Features

* **button:** reflect aria-checked, aria-selected and role ([8e11d3e](https://github.com/statistikZH/leu/commit/8e11d3ea9c77dc27582dfca3b7f240e184b91316))
* **chip-group:** add optional label to the chip group ([03cc159](https://github.com/statistikZH/leu/commit/03cc159a9edfb0b710572f4b88aa3b3b52000e80))
* **dropdown:** close dropdown with a click outside the element or with pressing escape ([#146](https://github.com/statistikZH/leu/issues/146)) ([8b07146](https://github.com/statistikZH/leu/commit/8b071467b76c3e4b502e7daf28d432f722736ad9))
* export type declaration files and add type checking ([#155](https://github.com/statistikZH/leu/issues/155)) ([781ff9a](https://github.com/statistikZH/leu/commit/781ff9a865e52d8076df12e198d9a173202b352d))
* **input:** add step attribute that will be reflected to the native input element ([59aa303](https://github.com/statistikZH/leu/commit/59aa30352b77d0f46c9e1f3b688bbf556c9b592b))
* **scroll-top:** implement scroll-top component ([07c670c](https://github.com/statistikZH/leu/commit/07c670c173719398d1e0a04345a1c2a6d4f3a5e4))
* **theme:** define custom properties for all font styles and curves ([#142](https://github.com/statistikZH/leu/issues/142)) ([fadafde](https://github.com/statistikZH/leu/commit/fadafde3e2c4a8f0607ad08624515c907920ce9d))
* **visually-hidden:** implement a utility component to visually hide content ([98143c6](https://github.com/statistikZH/leu/commit/98143c69523d17164cbb5b2d71879193cf442219))


### Bug Fixes

* **chip:** prefix custom event according to the event naming guidelines ([4d3709c](https://github.com/statistikZH/leu/commit/4d3709c6b0a06c5be0daf2f6df54feed5f7e6ce4))
* **chip:** truncate text instead of wrapping inside the chip ([03cc159](https://github.com/statistikZH/leu/commit/03cc159a9edfb0b710572f4b88aa3b3b52000e80))
* **chip:** use correct aria attribute to represent the state of the chip ([4d3709c](https://github.com/statistikZH/leu/commit/4d3709c6b0a06c5be0daf2f6df54feed5f7e6ce4))
* **input:** avoid empty strings to be converted to the value zero ([59aa303](https://github.com/statistikZH/leu/commit/59aa30352b77d0f46c9e1f3b688bbf556c9b592b))
* **pagination:** add a visually hidden label for the page input field ([98143c6](https://github.com/statistikZH/leu/commit/98143c69523d17164cbb5b2d71879193cf442219))
* **pagination:** define visually hidden labels for the buttons ([201464b](https://github.com/statistikZH/leu/commit/201464b24f997657029275a763b61ef07c8e26d1))

## [0.4.0](https://github.com/statistikZH/leu/compare/v0.3.0...v0.4.0) (2024-02-21)


### Features

* **breadcrumbs:** implement breadcrumb component  ([#71](https://github.com/statistikZH/leu/issues/71)) ([9e0583a](https://github.com/statistikZH/leu/commit/9e0583a1d57cd0d15c1a5d7f983ce78a51786dc9))
* **breadcrumbs:** use popup component to display menu ([85f9f88](https://github.com/statistikZH/leu/commit/85f9f88974ccb29c486780188d1c631cf4a19d62))
* **checkbox:** use property instead of slot to set legend and label ([d571d66](https://github.com/statistikZH/leu/commit/d571d66259eae96cb4475c516eab666387d8b026))
* **dropdown:** close dropdown when a menu-item child was clicked ([1c1cee9](https://github.com/statistikZH/leu/commit/1c1cee916ce8926c3fea6e40be6038e487e5c74d))
* **dropdown:** use popup component to display menu ([85f9f88](https://github.com/statistikZH/leu/commit/85f9f88974ccb29c486780188d1c631cf4a19d62))
* **menu-item:** add href property to use menu-item as a link ([6c203e8](https://github.com/statistikZH/leu/commit/6c203e8086cade77c4266c002ae978d0bca851db))
* **popup:** implement a helper component to build floating ui components ([85f9f88](https://github.com/statistikZH/leu/commit/85f9f88974ccb29c486780188d1c631cf4a19d62))
* **select:** use popup component to display item list ([85f9f88](https://github.com/statistikZH/leu/commit/85f9f88974ccb29c486780188d1c631cf4a19d62))


### Bug Fixes

* **generator-script:** replace hardcoded value with a placeholder ([#77](https://github.com/statistikZH/leu/issues/77)) ([ff0a152](https://github.com/statistikZH/leu/commit/ff0a1527a3824fd04fe2020778901de36999755f))
* **input:** avoid undefined string as value of the input element ([#114](https://github.com/statistikZH/leu/issues/114)) ([e33865a](https://github.com/statistikZH/leu/commit/e33865a59f621fe2547a7ef68f7d583cc8805a07))
* **input:** dispatch an input event when the inner input fires an input event ([#94](https://github.com/statistikZH/leu/issues/94)) ([ea0969a](https://github.com/statistikZH/leu/commit/ea0969aea1bee7d361d49395288f0e556672c04d))
* **input:** fix the postion of the label when the input is invalid ([425639f](https://github.com/statistikZH/leu/commit/425639fe43b6af73321e63455329d94430a9d5e2))
* **menu-item:** specify a disabled style for menu items ([1c1cee9](https://github.com/statistikZH/leu/commit/1c1cee916ce8926c3fea6e40be6038e487e5c74d))
* **pagination:** delegate focus to the input element ([#126](https://github.com/statistikZH/leu/issues/126)) ([6288318](https://github.com/statistikZH/leu/commit/6288318b649157d88a3b75b6625d223c3b4dd750))
* **pagination:** only dispatch change event when the actual value has changed ([490df0c](https://github.com/statistikZH/leu/commit/490df0cb5b804f2b55c0c329674544ba00f7845a))
* **pagination:** remove most keydown handling to avoid interference with keyboard shortcuts ([490df0c](https://github.com/statistikZH/leu/commit/490df0cb5b804f2b55c0c329674544ba00f7845a))
* **pagination:** set all default values to 1 to prevent invalid states ([#129](https://github.com/statistikZH/leu/issues/129)) ([9330ef7](https://github.com/statistikZH/leu/commit/9330ef7b40e7f241da0861701a8e3898d70c297d))
* **select:** adjust to the new leu-input api ([d571d66](https://github.com/statistikZH/leu/commit/d571d66259eae96cb4475c516eab666387d8b026))
* **select:** adjust to the new menu-item api ([#128](https://github.com/statistikZH/leu/issues/128)) ([5acdab8](https://github.com/statistikZH/leu/commit/5acdab83031f1a6237fc7c1d0e354d06d78333e1))
* **table:** use a page state that can be passed to the pagination for a two way binding ([490df0c](https://github.com/statistikZH/leu/commit/490df0cb5b804f2b55c0c329674544ba00f7845a))

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
