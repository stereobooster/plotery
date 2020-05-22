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


### Chart component

Root component for all **Plotery** charts.

#### Properties

| Prop     | Type                   | Default | Description    |
| -------- | ---------------------- | ------- | -------------- |
| `data`   | `ChartData` (required) |         | Charts series. |


### Surface component

Encapsulates the coordinate system. Allows defining an axis for `Surface` scope, so series defined
in that scope use that axis. `Chart` introduce `Surface` implicitly.

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


### LinearAxis component

Define linear cartesian axis.

#### Properties

| Prop        | Type                                    | Default                                | Description                                                                   |
| ----------- | --------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| `class`¹    | `string`                                | none                                   | Space-separated list of the classes applied to axis container.                |
| `type`      | `'x' ⎮ 'y'` (required)                  |                                        | Type of axis.                                                                 |
| `min`       | `number` (required)                     |                                        | Low axis limit.                                                               |
| `max`       | `number` (required)                     |                                        | High axis limit.                                                              |
| `position`  | `'start' ⎮ 'end'`                       | `'start'` for `'x'`, `'end'` for `'y'` | Position of axis labels.                                                      |
| `hide`      | `boolean`                               | `false`                                | Don't display axis (it will be used only for coordinate system).              |
| `reference` | `number`                                | `0`                                    | Reference value (origin).                                                     |
| `step`      | `number`                                | *calculated from `min` and `max`*      | Step between consequence major ticks.                                         |
| `divisor`   | `number`                                | `5`                                    | How many minor ticks are in one major tick.                                   |
| `major`     | `boolean`                               | `false`                                | Show major grid.                                                              |
| `minor`     | `boolean`                               | `false`                                | Show minor grid.                                                              |
| `labels`    | `string[] ⎮ { (tick: number): string }` | `x => ‘${x}‘`                          | Labels for axis. Array of label strings must have same length as major ticks. |

*¹`class` and `className` are equivalent.*


### LogAxis component

Define logarithmic cartesian axis.

#### Properties

| Prop        | Type                                    | Default                                | Description                                                                   |
| ----------- | --------------------------------------- | -------------------------------------- | ----------------------------------------------------------------------------- |
| `class`¹    | `string`                                | none                                   | Space-separated list of the classes applied to axis container.                |
| `type`      | `'x' ⎮ 'y'` (required)                  |                                        | Type of axis.                                                                 |
| `min`       | `number` (required)                     |                                        | Low axis limit.                                                               |
| `max`       | `number` (required)                     |                                        | High axis limit.                                                              |
| `position`  | `'start' ⎮ 'end'`                       | `'start'` for `'x'`, `'end'` for `'y'` | Position of axis labels.                                                      |
| `hide`      | `boolean`                               | `false`                                | Don't display axis (it will be used only for coordinate system).              |
| `reference` | `number`                                | `0`                                    | Reference value (origin).                                                     |
| `step`      | `number`                                | *calculated from `min` and `max`*      | Step between consequence major ticks.                                         |
| `divisor`   | `number`                                | `5`                                    | How many minor ticks are in one major tick.                                   |
| `major`     | `boolean`                               | `false`                                | Show major grid.                                                              |
| `minor`     | `boolean`                               | `false`                                | Show minor grid.                                                              |
| `labels`    | `string[] ⎮ { (tick: number): string }` | `x => ‘${x}‘`                          | Labels for axis. Array of label strings must have same length as major ticks. |

*¹`class` and `className` are equivalent.*


### LinearLine component

Renders data series as X-Y linear line.

#### Properties

| Prop     | Type      | Default | Description                                                    |
| -------- | --------- | ------- | -------------------------------------------------------------- |
| `class`¹ | `string`  | none    | Space-separated list of the classes applied to line container. |
| `series` | `string`  | none    | Defines a key to series in the data object, if specified.      |
| `line`   | `boolean` | `true`  | Draw line.                                                     |
| `area`   | `boolean` | `false` | Draw area filled to 'y' axis reference.                        |

*¹`class` and `className` are equivalent.*

Any other passed property will be added to `LinearLine` container.


### CardinalLine component

Renders data series as X-Y line with Catmull-Rome spline interpolation.

#### Properties

| Prop      | Type      | Default | Description                                                    |
| --------- | --------- | ------- | -------------------------------------------------------------- |
| `class`¹  | `string`  | none    | Space-separated list of the classes applied to line container. |
| `series`  | `string`  | none    | Defines a key to series in the data object, if specified.      |
| `tension` | `number`  | 1       | Affects how sharply the curve bends control points (0..1).     |
| `line`    | `boolean` | `true`  | Draw line.                                                     |
| `area`    | `boolean` | `false` | Draw area filled to 'y' axis reference.                        |

*¹`class` and `className` are equivalent.*

Any other passed property will be added to `CardinalLine` container.


### BarLine component

Renders data series as discrete bars.

#### Properties

| Prop     | Type      | Default | Description                                                    |
| -------- | --------- | ------- | -------------------------------------------------------------- |
| `class`¹ | `string`  | none    | Space-separated list of the classes applied to line container. |
| `series` | `string`  | none    | Defines a key to series in the data object, if specified.      |

*¹`class` and `className` are equivalent.*

Any other passed property will be added to `BarLine` container.


### Zoom component

Include controls to enable zooming with a pointer device.

Example of usage:

```jsx
_handleZoom = zoom => this.setState({ zoom });

// ...

<Chart data={data}>
	<LinearAxis type="x" min={zoom ? zoom[0] : 0} max={zoom ? zoom[1] : 100} />
	<LinearAxis type="y" min={-10} max={10} />
	<LinearLine />
	<Zoom restrict="x" onZoom={this._handleZoom} />
</Chart>
```

#### Properties

| Prop       | Type                            | Default | Description                                    |
| ---------- | ------------------------------- | ------- | ---------------------------------------------- |
| `restrict` | `'x' ⎮ 'y'`                     | none    | Optionally restrict to 'x' or 'y' axis.        |
| `onZoom`   | `{ (limits?: number[]): void }` | none    | Callback, that is called if range is selected. |


## Styles

**Plotery** uses CSS to style its charts, so you must include it to your bundle. Please see
`style` and `sass` property of `package.json`.


## Todos

- Documentation & typings for `RadialAxis`, `AngularAxis`, `PolarLine`, and `PolarSector`.

Interactions:

- `ZoomAndPan`
- `Tooltip`

**PRs are welcome!**
