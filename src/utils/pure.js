import { h, Component } from 'preact';
import { shallowCompare } from './shallow-compare';

export const pure = (fn, isCheck) => class extends Component {
	shouldComponentUpdate(nextProps) {
		return !shallowCompare(this.props, nextProps, isCheck);
	}

	render(props) {
		return h(fn, props);
	}
};
