import { h, Component } from 'preact';
import { pure } from '../utils/pure';

export const PolarSector = pure(class extends Component {
	_transform(points, inner, outer) {
		const { axes } = this.props;
		const center = axes.r.center;
		const r0 = axes.r.scale(outer);
		const r1 = axes.r.scale(inner);
		return points.map(p => {
			const [t0, t1] = p.map(x => axes.t.scale(x)).sort((a, b) => a - b);
			const t05 = (t0 + t1) / 2;
			return [
				[center.x + r0 * Math.sin(t0), center.y - r0 * Math.cos(t0)],
				[center.x + r0 * Math.sin(t05), center.y - r0 * Math.cos(t05)],
				[center.x + r0 * Math.sin(t1), center.y - r0 * Math.cos(t1)],
				[center.x + r1 * Math.sin(t1), center.y - r1 * Math.cos(t1)],
				[center.x + r1 * Math.sin(t05), center.y - r1 * Math.cos(t05)],
				[center.x + r1 * Math.sin(t0), center.y - r1 * Math.cos(t0)],
				r0, r1, (t05 - t0) % Math.PI
			];
		});
	}

	_calcPath(x) {
		return `M${x[0][0]},${x[0][1]}`
			+ `A${x[6]},${x[6]},0,0,1,${x[1][0]},${x[1][1]}`
			+ `A${x[6]},${x[6]},0,0,1,${x[2][0]},${x[2][1]}`
			+ `${x[8] ? 'L' : 'ZM'}${x[3][0]},${x[3][1]}`
			+ `A${x[7]},${x[7]},0,0,0,${x[4][0]},${x[4][1]}`
			+ `A${x[7]},${x[7]},0,0,0,${x[5][0]},${x[5][1]}`
			+ 'Z';
	}

	render({ className, host, data, rect, axes, series, inner = 0, outer = 100, ...attrs }) {
		const points = data && (series ? data[series] : data);
		if (!points || !points.length || !axes.r || !axes.t) {
			return null;
		}
		const coords = this._transform(points, inner, outer);
		const cls = [
			'plot polar sector',
			series,
			this.props.class || className
		].filter(x => x);
		/* eslint-disable react/no-array-index-key */
		return (
			<svg className={cls.join(' ')} width={rect.width} height={rect.height} {...attrs}>
				{coords.map((x, i) => (
					<path key={i} className="element" d={this._calcPath(x)} />
				))}
			</svg>
		);
		/* eslint-enable react/no-array-index-key */
	}
});
