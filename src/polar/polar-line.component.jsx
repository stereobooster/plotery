import { h, Component } from 'preact';
import { pure } from '../utils/pure';
import { linear } from '../math/interpolations/linear';

export const PolarLine = pure(class extends Component {
	_scale(points) {
		const { axes } = this.props;
		const center = axes.r.center;
		return points.map(x => {
			const r = axes.r.scale(x[0]);
			const t = axes.t.scale(x[1]);
			return [center.x + r * Math.cos(t), center.y + r * Math.sin(t)];
		});
	}

	render({ className, data, rect, axes, series, interpolate = linear, ...attrs }) {
		const points = data && (series ? data[series] : data);
		if (!points || !points.length || !axes.r || !axes.t) {
			return null;
		}
		const scaled = this._scale(points);
		const path = interpolate(scaled, attrs);
		const cls = [
			'plot polar line',
			series,
			this.props.class || className
		].filter(x => x);
		return (
			<svg className={cls.join(' ')} width={rect.width} height={rect.height} {...attrs}>
				<path className="line" d={path} />
			</svg>
		);
	}
});
