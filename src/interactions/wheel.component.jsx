import { Component } from 'preact';
import { registerEvents } from '../utils/register-events';

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
			wheel: [this._handleWheel]
		});
	}

	_unregisterEvents() {
		this._teardownEvents && this._teardownEvents();
		this._teardownEvents = null;
	}

	_handleWheel = event => {
		this.props.onWheel && this.props.onWheel(event);
	}

	render() {
		return null;
	}
}
