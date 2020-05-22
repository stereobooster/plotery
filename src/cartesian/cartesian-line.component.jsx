import { h, Component } from 'preact';
import { shallowCompare } from '../utils/shallow-compare';
import { linear } from '../math/interpolations/linear';

export class CartesianLine extends Component {
	shouldComponentUpdate(nextProps) {
		return !shallowCompare(this.props, nextProps);
	}

	_scale(points) {
		return points.map(x => [this.props.axes.x.scale(x[0]), this.props.axes.y.scale(x[1])]);
	}

	_closePath(points, path) {
		const zero = this.props.axes.y.scale(this.props.axes.y.reference);
		return `${path}L${points[points.length - 1][0]},${zero}L${points[0][0]},${zero}Z`;
	}

	render({ className, data, rect, axes, series, line, area, interpolate = linear, ...attrs }) {
		const points = data && (series ? data[series] : data);
		if (!points || !points.length || !axes.x || !axes.y) {
			return null;
		}
		const scaled = this._scale(points);
		const path = interpolate(scaled);
		const cls = [
			'plot cartesian line',
			series,
			this.props.class || className
		].filter(x => x);
		return (
			<svg className={cls.join(' ')} width={rect.width} height={rect.height}>
				{area && (
					<path
						key="area"
						className="area"
						d={this._closePath(scaled, path)}
						{...attrs} />
				)}
				{line !== false && (
					<path
						key="line"
						className="line"
						d={path}
						{...attrs} />
				)}
			</svg>
		);
	}
}
