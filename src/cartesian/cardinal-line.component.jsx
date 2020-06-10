import { h, Component } from 'preact';
import { pure } from '../utils/pure';
import { CartesianLine } from './cartesian-line.component';
import { cardinal } from '../math/interpolations/cardinal';

export const CardinalLine = pure(class extends Component {
	_interpolate = points => cardinal(points, this.props.tension);

	// eslint-disable-next-line no-unused-vars
	render({ tension, ...attrs }) {
		return (<CartesianLine interpolate={this._interpolate} {...attrs} />);
	}
});
