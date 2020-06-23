# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]

### Changed

- **BREAKING**: `Zoom.onZoom` is renamed to `Zoom.onLimits` and always pass
  full [x0, y0, x1, y1] rect. `Zoom.restrict` is now only presentional.


### Fixed

- Fix axis labels positions.


## [0.3.0] - 2020-06-13

### Added

- Axes and lines now have `class`/`className` prop.
- Add `CardinalLine` that use Bézier curve.
- New polar types: `RadialAxis`, `AngularAxis`, `PolarLine`, and `PolarSector`.


### Changed

- Apply `{...attrs}` props to lines containers.
- New default styles.
- Most of the low-level functions & components are now exported to make it easy
  to build your own components without having to duplicate the code.


### Fixed

- Fix unnecessary renderings.


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


[Unreleased]: https://bitbucket.org/shelacek/plotery/branches/compare/master..v0.3.0
[0.3.0]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.3.0..v0.2.1
[0.2.1]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.2.1..v0.2.0
[0.2.0]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.2.0..v0.1.0
[0.1.0]: https://bitbucket.org/shelacek/plotery/commits/tag/v0.1.0
