import { h, Component } from 'preact';
import { bind } from './utils/bind';
import { withProps } from './utils/with-props';

export class Surface extends Component {
	state = {
		axes: {}
	};

	@bind
	registerAxis(axis) {
		this.setState(state => ({
			axes: { ...state.axes, [axis.type]: axis }
		}));
	}

	render({ children, axes }, { axes: localAxes }) {
		return (
			<g>
				{withProps(children, {
					registerAxis: this.registerAxis,
					axes: { ...axes, ...localAxes }
				})}
			</g>
		);
	}
}
