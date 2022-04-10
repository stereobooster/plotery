import { h, Component } from 'preact';
import { getRelativeCoords } from '../utils/get-relative-coords';
import { Pointer } from './pointer.component';

export class BoxZoom extends Component {
	state = {
		begin: null,
		end: null
	};

	_handlePointerDown = event => {
		!this.state.begin && this.setState({
			begin: getRelativeCoords(event, this.props.rect)
		});
		event.preventDefault();
	};

	_handlePointerMove = event => {
		this.state.begin && this.setState({
			end: getRelativeCoords(event, this.props.rect)
		});
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

	render(props, { begin, end }) {
		return (
			<g className="box-zoom">
				{end && (<path className="backdrop" d={this._calcBackdropPath(begin, end)} />)}
				{end && (<path className="outline" d={this._calcOutlinePath(begin, end)} />)}
				<Pointer
					onPointerDown={this._handlePointerDown}
					onPointerMove={this._handlePointerMove}
					onPointerUp={this._handlePointerUp}
					{...props} />
			</g>
		);
	}
}
