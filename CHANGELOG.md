# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.9.0] - 2019-02-18

### Added

- Adding `strict` mode to `number`, `boolean` and `date` (thanks to [Sergio Fernández](https://github.com/xergiodf)).

## [1.8.0] - 2019-02-16

### Added

- Adding `strict` mode to `object` validator.
- Adding `throw` middleware.

## [1.7.0] - 2019-02-05

### Added

- Adding `password` validator
- Adding `url` validator

## [1.6.0] - 2019-02-04

### Added

- Adding `middlewares`

### Changed

- (*BREAKING CHANGE*) Now the `allow` and `reject` hooks are middlewares and runs automatically, not need to handle inside the custom validator.
  - The functions `ctx.handleAllowedValues`, `ctx.handleRejectedValues` and `ctx.handlePreValidation` were removed and will no longer works.

## [1.5.0] - 2019-01-27

### Added

- Adding `custom` validator
- Adding docs for "Creating your validator".

### Fixed

- Linking the `or` validator

## [1.4.1] - 2019-01-26

### Added

- Adding `or` validator
- Adding `getErrorInPath` helper

### Fixed

- Fixing translation in global validators

### BREAKING CHANGES

- The `errors` result changed to be easier to track and get by path.


## [1.2.0] - 2019-01-25

### Added

- Adding `email` validator.
- Adding translations

### Fixed

- Fixing `boolean` validator link.


## [1.1.0] - 2019-01-25

- First release