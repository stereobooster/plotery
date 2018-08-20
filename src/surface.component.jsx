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
			axes: Object.assign({}, state.axes, { [axis.type]: axis })
		}));
	}

	render() {
		return (
			<g>
				{withProps(this.props.children, {
					registerAxis: this.registerAxis,
					axes: Object.assign({}, this.props.axes, this.state.axes)
				})}
			</g>
		);
	}
}
