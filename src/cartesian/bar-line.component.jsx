import { h, Component } from 'preact';
import { pure } from '../utils/pure';

export const BarLine = pure(class extends Component {
	_scale(points) {
		return points.map(x => [
			this.props.axes.x.scale(x[0]),
			this.props.axes.y.scale(x[1])
		]);
	}

	_calcPath(points) {
		const zero = this.props.axes.y.scale(this.props.axes.y.reference);
		return points.reduce((acc, x) => `${acc}M${x[0]},${x[1]}V${zero}`, '');
	}

	render({ className, host, data, rect, axes, series, ...attrs }) {
		const points = data && (series ? data[series] : data);
		if (!points || !points.length || !axes.x || !axes.y) {
			return null;
		}
		const scaled = this._scale(points);
		const path = this._calcPath(scaled);
		const cls = [
			'plot cartesian bar',
			series,
			this.props.class || className
		].filter(x => x);
		return (
			<svg className={cls.join(' ')} width={rect.width} height={rect.height} {...attrs}>
				<path className="bars" d={path} />
			</svg>
		);
	}
});
