import { h, Component } from 'preact';
import { shallowCompare } from '../utils/shallow-compare';

export class BarLine extends Component {
	shouldComponentUpdate(nextProps) {
		return !shallowCompare(this.props, nextProps);
	}

	_scale(points) {
		return points.map(x => [this.props.axes.x.scale(x[0]), this.props.axes.y.scale(x[1])]);
	}

	_calcPath(points) {
		const zero = this.props.axes.y.scale(this.props.axes.y.reference);
		return points.reduce((acc, x) => `${acc}M${x[0]},${x[1]}V${zero}`, '');
	}

	render({ className, data, rect, axes, series }) {
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
			<svg className={cls.join(' ')} width={rect.width} height={rect.height}>
				<path className="bars" d={path} />
			</svg>
		);
	}
}
