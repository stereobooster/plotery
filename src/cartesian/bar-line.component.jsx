import { h, Component } from 'preact';
import { shallowCompare } from '../utils/shallow-compare';

export class BarLine extends Component {
	shouldComponentUpdate(nextProps) {
		return !shallowCompare(this.props, nextProps, [
			'data',
			'rect',
			'axes',
			'series'
		]);
	}

	_scale(points) {
		return points.map(x => [this.props.axes.x.scale(x[0]), this.props.axes.y.scale(x[1])]);
	}

	_calcPath(points) {
		const zero = this.props.axes.y.scale(this.props.axes.y.reference);
		return points.reduce((acc, x) => `${acc}M${x[0]},${x[1]}V${zero}`, '');
	}

	render() {
		const { data, rect, axes, series } = this.props;
		const points = data && (series ? data[series] : data);
		if (!points || !points.length || !axes.x || !axes.y) {
			return null;
		}
		const scaled = this._scale(points);
		const path = this._calcPath(scaled);
		const className = ['plot', series].filter(x => x).join(' ');
		return (
			<svg className={className} width={rect.width} height={rect.height}>
				<path className="bars" d={path} />
			</svg>
		);
	}
}
