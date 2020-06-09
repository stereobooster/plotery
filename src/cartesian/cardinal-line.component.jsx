import { h, Component } from 'preact';
import { bind } from '../utils/bind';
import { pure } from '../utils/pure';
import { CartesianLine } from './cartesian-line.component';
import { cardinal } from '../math/interpolations/cardinal';

export const CardinalLine = pure(class extends Component {
	@bind
	_interpolate(points) {
		return cardinal(points, this.props.tension);
	}

	// eslint-disable-next-line no-unused-vars
	render({ tension, ...attrs }) {
		return (<CartesianLine interpolate={this._interpolate} {...attrs} />);
	}
});
