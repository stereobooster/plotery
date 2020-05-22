# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]

### Added

- Axes and lines now have `class`/`className` prop.


## [0.2.1] - 2018-11-05

### Changed

- Guard `LinearLine` and `BarLine` render with shouldComponentUpdate.
- Improve `Zoom` range selection (can be dragged over plot canvas).


## [0.2.0] - 2018-08-23

### Added

- Logaritmic axis - `LogAxis`.
- Add `series` prop to plot's classes to enable CSS selecting.
- Alternate plot's colors.


### Fixed

- Remove oversighted console.log on resize.
- Don't draw plots when some axis missing.
- Fix handling of missing data.


## [0.1.0] - 2018-08-20

### Added

- Initial version.


[Unreleased]: https://bitbucket.org/shelacek/plotery/branches/compare/master..v0.2.1
[0.2.1]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.2.1..v0.2.0
[0.2.0]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.2.0..v0.1.0
[0.1.0]: https://bitbucket.org/shelacek/plotery/commits/tag/v0.1.0
