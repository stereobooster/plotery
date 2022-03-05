import { h, Component } from 'preact';
import { getRelativeCoords } from '../utils/get-relative-coords';
import { withProps } from '../utils/with-props';
import { Pointer } from './pointer.component';

export class Tooltip extends Component {
	state = {
		position: null
	};

	_handlePointerEnter = event => {
		this.setState({ position: getRelativeCoords(event, this.props.rect) });
	};

	_handlePointerLeave = () => {
		this.setState({ position: null });
	};

	_handlePointerMove = event => {
		this.setState({ position: getRelativeCoords(event, this.props.rect) });
	};

	render({ children, host, ...attrs }, { position }) {
		return (
			<g className="tooltip">
				{position && withProps(children, { ...attrs, position })}
				<Pointer
					host={host}
					onPointerEnter={this._handlePointerEnter}
					onPointerMove={this._handlePointerMove}
					onPointerLeave={this._handlePointerLeave} />
			</g>
		);
	}
}
