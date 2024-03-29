import { Component } from 'preact';
import { withProps } from './utils/with-props';
import { shallowCompare } from './utils/shallow-compare';

export class Surface extends Component {
	state = {
		remoteAxes: {},
		localAxes: {},
		axes: {}
	};

	static getDerivedStateFromProps(props, state) {
		return shallowCompare(props.axes, state.remoteAxes) ? null : {
			remoteAxes: props.axes,
			axes: { ...props.axes, ...state.localAxes }
		};
	}

	updateAxis = axis => this.setState(state => ({
		localAxes: { ...state.localAxes, [axis.type]: axis },
		axes: { ...state.remoteAxes, ...state.localAxes, [axis.type]: axis }
	}));

	render({ children }, { axes }) {
		return withProps(children, { updateAxis: this.updateAxis, axes: axes });
	}
}
