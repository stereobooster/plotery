# Plotery

[![npm](https://img.shields.io/npm/v/@shelacek/plotery.svg)](https://www.npmjs.com/package/@shelacek/plotery)
[![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@shelacek/plotery.svg)](https://bundlephobia.com/result?p=@shelacek/plotery)

*Fast and lightweight plotting library for Preact without fuss.*

![Screenshot of some Plotery graph](//bitbucket.org/shelacek/plotery/raw/master/screenshot.png)

There are many plotting libraries in the wild. Many of them are enormous, all capable or poorly extensible. If there
are some extensible lightweight library, then it is usually slow. **Plotery** is different - small, contains the bare
essentials and it is fast. I simply need a library that is capable draw thousands of points in real time and which
would fit into a small embedded device with a few spare kilobytes.

If you need charting library, that magically render any arbitrary data that you put in, **Plotery** is probably not
for you.

> ⚠ Please note this package is in the early alpha stage. Nothing is stable. If you encounter a bug,
> please [create an issue].

[create an issue]: https://bitbucket.org/shelacek/plotery/issues
[CHANGELOG.md]: https://bitbucket.org/shelacek/plotery/src/master/CHANGELOG.md


## Example

Minimal example can look like:

```jsx
<Chart data={data}>
	<LinearAxis type="x" min={0} max={100} />
	<LinearAxis type="y" min={-10} max={10} />
	<LinearLine />
</Chart>
```

All components are available on the top-level export:

```js
import { Chart, LinearAxis, LinearLine /* ... */ } from '@shelacek/plotery';
```

## Data format

Data must be provided in following format:

```
[number, number][] | { [series: string]: [number, number][] };
```

If data is an object, then chart lines must be provided with `series` props.


## API

> Note: For full API of exported symbols, please see typings at
> https://bitbucket.org/shelacek/plotery/src/master/src/types.d.ts.


### `Chart`

Root component for all **Plotery** charts.

#### Properties

- `data: ChartData` - charts series.


### `Surface`

Encapsulates the coordinate system. Allows defining an axis for `Surface` scope, so series defined
in that scope use that axis. `Chart` introduce `Scope` implicitly.

Example of multiple axis:

```jsx
<Chart data={data}>
	<LinearAxis type="x" min={0} max={100} />
	<Surface>
		<LinearAxis type="y" position="start" min={-10} max={10} />
		<LinearLine series="a" />
	<Surface>
	<Surface>
		<LinearAxis type="y" position="end" min={-100} max={100} />
		<LinearLine series="b" />
	<Surface>
</Chart>
```

#### Properties

*No public properties*


### `LinearAxis`

Define linear cartesian axis.

#### Properties

- `type: 'x' | 'y'` - type of axis.
- `position: 'start' | 'end'` (default: 'start' for `type` == 'x', 'end' for `type` == 'y') - position of axis labels.
- `hide: boolean` (default: false) - Don't display axis (it will be used only for coordinate system).
- `min: number` - low axis limit.
- `max: number` - high axis limit.
- `reference: number` (default: 0) - reference value (origin).
- `step: number` (optional) - Step between consequence major ticks.
- `divisor: number` (default: 5) - how many minor ticks are in one major tick.
- `major: boolean` (default: false) - show major grid.
- `minor: boolean` (default: false) - show minor grid.
- `labels: string[] | { (tick: number): string }` (default: x => x) - labels for axis. Array of label strings must have
  same length as major ticks.


### `LogAxis`

Define logarithmic cartesian axis.

#### Properties

- `type: 'x' | 'y'` - type of axis.
- `position: 'start' | 'end'` (default: 'start' for `type` == 'x', 'end' for `type` == 'y') - position of axis labels.
- `hide: boolean` (default: false) - Don't display axis (it will be used only for coordinate system).
- `min: number` - low axis limit.
- `max: number` - high axis limit.
- `reference: number` (default: 1) - reference value (origin).
- `step: number` (optional) - Step between consequence major ticks.
- `divisor: number` (default: 9) - how many minor ticks are in one major tick.
- `major: boolean` (default: false) - show major grid.
- `minor: boolean` (default: false) - show minor grid.
- `labels: string[] | { (tick: number): string }` (default: x => x) - labels for axis. Array of label strings must have
  same length as major ticks.


### `LinearLine`

Renders data series as X-Y linear line.

#### Properties

- `series: string` (optional) - defines a key to series in the data object, if specified.
- `line: boolean` (default: true) - draw line.
- `area: boolean` (default: false) - draw area filled to 'y' axis reference.


### `BarLine`

Renders data series as discrete bars.

#### Properties

- `series: string` (optional) - defines key to series in data object, if specified.


### `Zoom`

Include controls to enable zooming with a pointer device.

Example of usage:

```jsx
<Chart data={data}>
	<LinearAxis type="x" min={zoom ? zoom[0] : 0} max={zoom ? zoom[1] : 100} />
	<LinearAxis type="y" min={-10} max={10} />
	<LinearLine />
	<Zoom restrict="x" onZoom={zoom => this.setState({ zoom })} />
</Chart>
```

#### Properties

- `restrict: 'x' | 'y'` (optional) - optionally restrict to 'x' or 'y' axis.
- `onZoom: { (limits?: number[]): void }` (optional) - callback, that is called if range is selected.


## Styles

**Plotery** uses CSS to style its charts, so you must include it to your bundle. Please see
`style` and `sass` property of `package.json`.


## Todos

Cartesian charts:

- ~~`LogarithmAxis`~~ - implemented as `LogAxis`
- `CardinalLine` - like `LinearLine`, but with smoothing.

Polar charts:

- `PolarLine`
- `PolarAxis`

**PRs are welcome!**
