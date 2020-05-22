import { h, Component } from 'preact';

export class CartesianAxis extends Component {
	get type() {
		return this.props.type;
	}

	get reference() {
		return this.props.reference;
	}

	scale(value, reverse = false) {
		const { rect, min, max, scaler } = this.props;
		if (reverse) {
			const normalized = this.type === 'x' ? value / rect.width : 1 - value / rect.height;
			return scaler(normalized, min, max, reverse);
		}
		const normalized = scaler(value, min, max, reverse);
		return this.type === 'x' ? normalized * rect.width : (1 - normalized) * rect.height;
	}

	componentDidMount() {
		this.props.registerAxis(this);
	}

	_getPosition() {
		return this.props.position || (this.type === 'x' ? 'end' : 'start');
	}

	_calcPath(values) {
		const { width, height } = this.props.rect;
		const serializer = this.type === 'x' ? x => `M${x},0V${height}` : x => `M0,${x}H${width}`;
		return values.map(serializer).join('');
	}

	_renderLabels(labels, ticks, positions) {
		if (labels == null) {
			labels = ticks;
		}
		else if (!Array.isArray(labels)) {
			labels = ticks.map(labels);
		}
		if (labels.length !== positions.length) {
			return null;
		}
		if (this.type === 'x') {
			const { height } = this.props.rect;
			return (
				<g className="labels">
					{labels.map((x, index) => (
						<text key={x} x={positions[index]} y={height}>{x}</text>
					))}
				</g>
			);
		}
		return (
			<g className="labels">
				{labels.map((x, index) => (
					<text key={x} x="0" y={positions[index]}>{x}</text>
				))}
			</g>
		);
	}

	render({ className, rect, hide, min, max, reference, ticks, major, minor, labels }) {
		if (hide || min === max) {
			return null;
		}
		const majorPos = ticks.major.map(x => this.scale(x));
		const minorPos = minor && ticks.minor.map(x => this.scale(x));
		const refPos = this.scale(reference);
		const drawRef = major
			&& 0 <= refPos
			&& refPos <= (this.type === 'x' ? rect.width : rect.height);
		const cls = [
			'axis cartesian',
			this.type,
			this._getPosition(),
			this.props.class || className
		].filter(x => x);
		return (
			<g className={cls.join(' ')}>
				{major && <path className="grid major" d={this._calcPath(majorPos)} />}
				{minor && <path className="grid minor" d={this._calcPath(minorPos)} />}
				{drawRef && <path className="reference" d={this._calcPath([refPos])} />}
				{this._renderLabels(labels, ticks.major, majorPos)}
			</g>
		);
	}
}
