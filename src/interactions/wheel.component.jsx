import { Component } from 'preact';
import { registerEvents } from '../utils/register-events';
import { checkModifiers } from '../utils/check-modifiers';

export class Wheel extends Component {
	_teardownEvents = null;

	componentDidMount() {
		this._registerEvents();
	}

	componentWillUnmount() {
		this._unregisterEvents();
	}

	_registerEvents() {
		this._teardownEvents = registerEvents(this.props.host, {
			wheel: [this.props.onWheel && this._handleWheel]
		});
	}

	_unregisterEvents() {
		this._teardownEvents && this._teardownEvents();
		this._teardownEvents = null;
	}

	_handleWheel = event => {
		checkModifiers(event, this.props.modifiers)
			&& this.props.onWheel(event);
	};

	render() {
		return null;
	}
}
