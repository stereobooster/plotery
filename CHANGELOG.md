# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [Unreleased]

There are no changes yet.


## [1.1.1] - 2023-05-30

### Fixed

- Fixed CSS precedence for classes `.plotery .color-X`.


## [1.1.0] - 2022-10-09

### Added

- Use CSS custom properties to parameterize a stylesheet.


## [1.0.0] - 2022-09-04

### Changed

- Simplify README and added link to documentation.


## [1.0.0-alpha.4] - 2022-09-03

### Changed

- **BREAKING**: Apply `stroke`, `stroke-width` and `fill` properties
  to containers instead to symbols itself. This enable overriding with `style` attributes.
- Added classes `.plotery .color-X` to easily set specific color to lines or bars.


## [1.0.0-alpha.3] - 2022-08-28

### Fixed

- Fix deformed polar-sectors greater than 180°.


## [1.0.0-alpha.2] - 2022-04-10

### Added

- Added modifier props for `Pointer` and `Wheel` based components.
- Added class props to `Chart` component.
- Pass `Chart` component's `...attrs` properties to SVG container.

### Changed

- **BREAKING**: `Surface` component no longer introduces `<g>` container.
- CSS specificity for `.plot:nth-of-type(4n+i)` and `.plot .element:nth-of-type(4n+i)` is lowered.


## [1.0.0-alpha.1] - 2022-03-05

### Changed

- **BREAKING**: Preact 10 (aka PreactX) is now supported :-). Support for Preact 8
  is dropped :-(.


## [0.5.0] - 2022-03-05

### Added

- Add `Tooltip` helper component.

### Changed

- `Pointer` component now support also `onPointerEnter` and `onPointerLeave`
  handlers.

### Fixed

- Fix polar chart 90° rotation.
- Fix added classes to polar axis (minor axis no longer have major class).


## [0.4.2] - 2020-08-17

### Fixed

- `NaN` in max/min props of axis no longer cause freeze of the browser.
  `NaN` values are still invalid ;-).


## [0.4.1] - 2020-07-07

### Fixed

- Don't propagate `host` prop to `*Line` and `PolarSector` attributes.


## [0.4.0] - 2020-06-25

### Added

- Add `Pan` and `WheelZoom` components for axis manipulations.


### Changed

- **BREAKING**: `Zoom` component is renamed to `BoxZoom` and `Zoom.onZoom`
  to `BoxZoom.onLimits`. `BoxZoom.restrict` is now only presentional,
  `BoxZoom.onLimits` always pass full [x0, y0, x1, y1] rect.


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


[Unreleased]: https://bitbucket.org/shelacek/plotery/branches/compare/master..v1.1.1
[1.1.1]: https://bitbucket.org/shelacek/plotery/branches/compare/v1.1.1..v1.1.0
[1.1.0]: https://bitbucket.org/shelacek/plotery/branches/compare/v1.1.0..v1.0.0
[1.0.0]: https://bitbucket.org/shelacek/plotery/branches/compare/v1.0.0..v1.0.0-alpha.4
[1.0.0-alpha.4]: https://bitbucket.org/shelacek/plotery/branches/compare/v1.0.0-alpha.4..v1.0.0-alpha.3
[1.0.0-alpha.3]: https://bitbucket.org/shelacek/plotery/branches/compare/v1.0.0-alpha.3..v1.0.0-alpha.2
[1.0.0-alpha.2]: https://bitbucket.org/shelacek/plotery/branches/compare/v1.0.0-alpha.2..v1.0.0-alpha.1
[1.0.0-alpha.1]: https://bitbucket.org/shelacek/plotery/branches/compare/v1.0.0-alpha.1..v0.5.0
[0.5.0]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.5.0..v0.4.2
[0.4.2]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.4.2..v0.4.1
[0.4.1]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.4.1..v0.4.0
[0.4.0]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.4.0..v0.3.0
[0.3.0]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.3.0..v0.2.1
[0.2.1]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.2.1..v0.2.0
[0.2.0]: https://bitbucket.org/shelacek/plotery/branches/compare/v0.2.0..v0.1.0
[0.1.0]: https://bitbucket.org/shelacek/plotery/commits/tag/v0.1.0
