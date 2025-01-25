# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2024-07-21

### Added
- Can now specify the Microsoft Graph API version as a config option

### Changed
- Upgraded dependencies of main library
- Upgraded dependencies of example application

### Removed
- Removed dependency on pkginfo to facilitate bundling

### Deprecated
- Adding the User Principal Name (UPN) as an email address every time a `mail` property can't be found will be changed to opt-in behavior in future versions to avoid giving the impression that the UPN is always semantically a valid email

## [1.0.0] - 2022-04-14

The API/design is stable enough that this is marked as the 1.0.0 release.

### Added
- VS Code `launch.json` for example app
- New `prompt`, `login_hint`, `domain_hint`, `locale`, and `display` authorization parameters (See [#8](https://github.com/seanfisher/passport-microsoft/pull/8) and [#18](https://github.com/seanfisher/passport-microsoft/pull/18)), thanks to [@rachaelsingleton](https://github.com/rachaelsingleton)
- Support for a `tenant` configuration option (See [#17](https://github.com/seanfisher/passport-microsoft/pull/17))
- Documentation updates:
  - README updates for configuration options
  - Changelog

### Changed
- Use npm instead of yarn for tracking dependencies
- Upgraded dependencies of main library
- Upgraded dependencies of example application, including from Express 3.x to 4.x

### Security
- Upgraded dependencies to address https://nvd.nist.gov/vuln/detail/CVE-2021-415 by [@derekwheel](https://github.com/derekwheel)

## [0.1.0] - 2020-04-10
### Changed
- [Use userPrincipalName value as fallback for profile email](https://github.com/seanfisher/passport-microsoft/pull/5) by [@nhu](https://github.com/nhu)

## [0.0.5] - 2017-04-14
### Changed
- Updated some broken links in the documentation

## [0.0.4] - 2017-04-14
### Changed
- Renamed the strategy from `MicrosoftGraphStrategy` to `MicrosoftStrategy`
- Metadata and documentation updates

## [0.0.3] - 2017-04-12
### Changed
- Metadata and documentation updates

## [0.0.2] - 2017-04-12
### Added
- Initial public version
