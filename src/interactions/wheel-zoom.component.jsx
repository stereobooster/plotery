import { h, Component } from 'preact';
import { normalizeWheel } from '../utils/normalize-wheel';
import { Wheel } from './wheel.component';

export class WheelZoom extends Component {
	_handleWheel = event => {
		const { axes, rect, sensitivity = 0.002, onLimits } = this.props;
		if (onLimits) {
			const delta = normalizeWheel(event) * sensitivity;
			const deltaX = delta * rect.width;
			const deltaY = delta * rect.height;
			const ratioX = (event.pageX - rect.left) / rect.width;
			const ratioY = (event.pageY - rect.top) / rect.height;
			onLimits([
				axes.x.scale(-deltaX * ratioX, true),
				axes.y.scale(rect.height + deltaY * (1 - ratioY), true),
				axes.x.scale(rect.width + deltaX * (1 - ratioX), true),
				axes.y.scale(-deltaY * ratioY, true)
			]);
		}
		event.preventDefault();
	};

	render(props) {
		return (<Wheel onWheel={this._handleWheel} {...props} />);
	}
}
