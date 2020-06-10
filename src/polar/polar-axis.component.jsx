import { h, Component } from 'preact';
import { shallowCompare } from '../utils/shallow-compare';

export class PolarAxis extends Component {
	get type() {
		return this.props.type;
	}

	get center() {
		const { width, height } = this.props.rect;
		return { x: width / 2, y: height / 2 };
	}

	get radius() {
		const { width, height } = this.props.rect;
		return Math.min(width, height) / 2;
	}

	scale = (value, reverse = false) => {
		const { min, max, scaler } = this.props;
		const multiplier = this.type === 'r' ? this.radius : 2 * Math.PI;
		return (reverse ? 1 : multiplier)
			* scaler(value / (reverse ? multiplier : 1), min, max, reverse);
	};

	componentDidMount() {
		this.props.updateAxis(this);
	}

	componentDidUpdate(prevProps) {
		if (!shallowCompare(prevProps, this.props, x => x === 'min' || x === 'max')) {
			this.props.updateAxis(this);
		}
	}

	_transformTick = value => {
		const scaled = this.scale(value);
		if (this.type === 'r') {
			return [0, scaled];
		}
		const radius = this.radius;
		return [radius * Math.sin(scaled), radius * Math.cos(scaled)];
	};

	_calcPath(center, values) {
		return values
			.map(p => `M${center.x},${center.y}l${p[0]},${p[1]}`)
			.join('');
	}

	_renderGrid(values, className) {
		if (this.type === 'r') {
			return values.map(x => (
				<circle
					key={x[1]}
					className={className}
					cx={this.center.x}
					cy={this.center.y}
					r={x[1]} />
			));
		}
		return <path className="grid major" d={this._calcPath(this.center, values)} />;
	}

	_renderLabels(labels, ticks, positions) {
		if (labels == null) {
			labels = ticks;
		}
		else if (!Array.isArray(labels)) {
			labels = ticks.map(labels);
		}
		return labels.length !== positions.length ? null : (
			<g className="labels">
				{labels.map((x, i) => (
					<text
						key={x}
						x={this.center.x + positions[i][0]}
						y={this.center.y - positions[i][1]}>
						{x}
					</text>
				))}
			</g>
		);
	}

	render({ className, hide, min, max, ticks, major, minor, labels }) {
		if (hide || min === max) {
			return null;
		}
		const majorPos = ticks.major.map(this._transformTick);
		const minorPos = minor && ticks.minor.map(this._transformTick);
		const cls = [
			'axis polar',
			this.type,
			this.props.class || className
		].filter(x => x);
		return (
			<g className={cls.join(' ')}>
				{major && this._renderGrid(majorPos, 'grid major')}
				{minor && this._renderGrid(minorPos, 'grid minor')}
				{this._renderLabels(labels, ticks.major, majorPos)}
			</g>
		);
	}
}
