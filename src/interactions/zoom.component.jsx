import { h, Component } from 'preact';
import { Pointer } from './pointer.component';

export class Zoom extends Component {
	state = {
		begin: null,
		end: null
	};

	_clamp(value, min, max) {
		return Math.min(Math.max(value, min), max);
	}

	_getRelativeCoords(event) {
		const { left, top, width, height } = this.props.rect;
		return [
			this._clamp(event.pageX - left, 0, width),
			this._clamp(event.pageY - top, 0, height)
		];
	}

	_handlePointerDown = event => {
		!this.state.begin && this.setState({ begin: this._getRelativeCoords(event) });
		event.preventDefault();
	};

	_handlePointerMove = event => {
		this.state.begin && this.setState({ end: this._getRelativeCoords(event) });
	};

	_handlePointerUp = event => {
		const { onLimits } = this.props;
		onLimits && onLimits(this.state.end ? this._scaleCoords() : null);
		this.setState({ begin: null, end: null });
		event.preventDefault();
	};

	_scaleCoords() {
		const { axes } = this.props;
		const { begin, end } = this.state;
		const limits = [
			axes.x.scale(begin[0], true),
			axes.y.scale(begin[1], true),
			axes.x.scale(end[0], true),
			axes.y.scale(end[1], true)
		];
		if (limits[0] > limits[2]) {
			[limits[0], limits[2]] = [limits[2], limits[0]];
		}
		if (limits[1] > limits[3]) {
			[limits[1], limits[3]] = [limits[3], limits[1]];
		}
		return limits;
	}

	_calcBackdropPath([x1, y1], [x2, y2]) {
		const { width, height } = this.props.rect;
		const box = `M0,0H${width}V${height}H0Z`;
		switch (this.props.restrict) {
			case 'x':
				return `${box}M${x1},0V${height}H${x2}V0Z`;
			case 'y':
				return `${box}M0,${y1}H${width}V${y2}H0Z`;
		}
		return `${box}M${x1},${y1}H${x2}V${y2}H${x1}Z`;
	}

	_calcOutlinePath([x1, y1], [x2, y2]) {
		const { width, height } = this.props.rect;
		switch (this.props.restrict) {
			case 'x':
				return `M${x1},0V${height}M${x2},0V${height}`;
			case 'y':
				return `M0,${y1}H${width}M0,${y2}H${width}`;
		}
		return `M${x1},${y1}H${x2}V${y2}H${x1}Z`;
	}

	render({ host }, { begin, end }) {
		return (
			<g className="zoom">
				{end && (<path className="backdrop" d={this._calcBackdropPath(begin, end)} />)}
				{end && (<path className="outline" d={this._calcOutlinePath(begin, end)} />)}
				<Pointer
					host={host}
					onPointerDown={this._handlePointerDown}
					onPointerMove={this._handlePointerMove}
					onPointerUp={this._handlePointerUp} />
			</g>
		);
	}
}
