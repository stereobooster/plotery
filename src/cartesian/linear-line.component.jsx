import { h, Component } from 'preact';

export class LinearLine extends Component {
	_scale(points) {
		return points.map(x => [this.props.axes.x.scale(x[0]), this.props.axes.y.scale(x[1])]);
	}

	_calcPath(points) {
		return points.reduce((acc, x) => `${acc}${acc ? 'L' : 'M'}${x[0]},${x[1]}`, '');
	}

	_closePath(points, path) {
		const zero = this.props.axes.y.scale(this.props.axes.y.reference);
		return `${path}L${points[points.length - 1][0]},${zero}L${points[0][0]},${zero}Z`;
	}

	render() {
		const { data, rect, series, line, area } = this.props;
		const points = series ? data[series] : data;
		if (!points || !points.length) {
			return null;
		}
		const scaled = this._scale(points);
		const path = this._calcPath(scaled);
		return (
			<svg className="plot" width={rect.width} height={rect.height}>
				{area && <path key="area" className="area" d={this._closePath(scaled, path)} />}
				{line !== false && <path key="line" className="line" d={path} />}
			</svg>
		);
	}
}
