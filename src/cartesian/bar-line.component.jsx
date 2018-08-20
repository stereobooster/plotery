import { h, Component } from 'preact';

export class BarLine extends Component {
	_scale(points) {
		return points.map(x => [this.props.axes.x.scale(x[0]), this.props.axes.y.scale(x[1])]);
	}

	_calcPath(points) {
		const zero = this.props.axes.y.scale(this.props.axes.y.reference);
		return points.reduce((acc, x) => `${acc}M${x[0]},${x[1]}V${zero}`, '');
	}

	render() {
		const { data, rect, series } = this.props;
		const points = series ? data[series] : data;
		if (!points || !points.length) {
			return null;
		}
		const scaled = this._scale(points);
		const path = this._calcPath(scaled);
		return (
			<svg className="plot" width={rect.width} height={rect.height}>
				<path className="bars" d={path} />
			</svg>
		);
	}
}
