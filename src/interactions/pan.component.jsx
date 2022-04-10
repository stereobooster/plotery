import { h, Component } from 'preact';
import { Pointer } from './pointer.component';

export class Pan extends Component {
	state = {
		reference: null
	};

	_handlePointerDown = event => {
		this.setState({ reference: [event.pageX, event.pageY] });
		event.preventDefault();
	};

	_handlePointerMove = event => {
		this._emitChangeEvent(event);
	};

	_handlePointerUp = event => {
		this._emitChangeEvent(event);
		event.preventDefault();
	};

	_emitChangeEvent(event) {
		const { axes, rect, onLimits } = this.props;
		this.setState(state => {
			if (onLimits) {
				const deltaX = axes.x.scale(state.reference[0], true)
					- axes.x.scale(event.pageX, true);
				const deltaY = axes.y.scale(state.reference[1], true)
					- axes.y.scale(event.pageY, true);
				onLimits([
					axes.x.scale(0, true) + deltaX,
					axes.y.scale(rect.height, true) + deltaY,
					axes.x.scale(rect.width, true) + deltaX,
					axes.y.scale(0, true) + deltaY
				]);
			}
			return { reference: [event.pageX, event.pageY] };
		});
	}

	render(props) {
		return (
			<Pointer
				onPointerDown={this._handlePointerDown}
				onPointerMove={this._handlePointerMove}
				onPointerUp={this._handlePointerUp}
				{...props} />
		);
	}
}
