import { h, Component } from 'preact';
import { bind } from '../utils/bind';
import { shallowCompare } from '../utils/shallow-compare';
import { registerEvents } from '../utils/register-events';

export class Zoom extends Component {
	_teardownEvents = null;

	state = {
		begin: null,
		end: null
	};

	componentWillUnmount() {
		this._unregisterEvents();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !shallowCompare(this.props, nextProps, ['rect'])
			|| !shallowCompare(this.state, nextState);
	}

	_registerEvents() {
		this._teardownEvents = registerEvents(window, {
			pointermove: [this._handlePointerMove, { passive: true }],
			pointerup: [this._handlePointerUp]
		});
	}

	_unregisterEvents() {
		this._teardownEvents && this._teardownEvents();
		this._teardownEvents = null;
	}

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

	@bind
	_handlePointerDown(event) {
		this._registerEvents();
		!this.state.begin && this.setState({ begin: this._getRelativeCoords(event) });
		event.preventDefault();
	}

	@bind
	_handlePointerMove(event) {
		this.state.begin && this.setState({ end: this._getRelativeCoords(event) });
	}

	@bind
	_handlePointerUp(event) {
		this._unregisterEvents();
		const { onZoom, restrict } = this.props;
		if (onZoom) {
			if (this.state.end) {
				const limits = this._scaleCoords();
				switch (restrict) {
					case 'x':
						onZoom([limits[0], limits[2]]);
						break;
					case 'y':
						onZoom([limits[1], limits[3]]);
						break;
					default:
						onZoom(limits);
						break;
				}
			}
			else {
				onZoom(null);
			}
		}
		this.setState({ begin: null, end: null });
		event.preventDefault();
	}

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

	render() {
		const { width, height } = this.props.rect;
		const { begin, end } = this.state;
		return (
			<g className="zoom">
				{end && <path className="backdrop" d={this._calcBackdropPath(begin, end)} />}
				{end && <path className="outline" d={this._calcOutlinePath(begin, end)} />}
				<rect
						className="event-sink"
						x="0"
						y="0"
						width={width}
						height={height}
						onPointerDown={this._handlePointerDown} />
			</g>
		);
	}
}
