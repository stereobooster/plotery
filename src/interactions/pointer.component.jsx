import { Component } from 'preact';
import { registerEvents } from '../utils/register-events';

export class Pointer extends Component {
	_teardownStartupEvents = null;
	_teardownEvents = null;

	componentDidMount() {
		this._registerStartupEvents();
	}

	componentWillUnmount() {
		this._unregisterEvents();
		this._unregisterStartupEvents();
	}

	_registerStartupEvents() {
		this._teardownStartupEvents = registerEvents(this.props.host, {
			pointerdown: [this.props.onPointerDown && this._handlePointerDown]
		});
	}

	_registerEvents() {
		this._teardownEvents = registerEvents(window, {
			pointermove: [this.props.onPointerMove, { passive: true }],
			pointerup: [this._handlePointerUp]
		});
	}

	_unregisterStartupEvents() {
		this._teardownStartupEvents && this._teardownStartupEvents();
		this._teardownStartupEvents = null;
	}

	_unregisterEvents() {
		this._teardownEvents && this._teardownEvents();
		this._teardownEvents = null;
	}

	_handlePointerDown = event => {
		this._registerEvents();
		this.props.onPointerDown(event);
	};

	_handlePointerUp = event => {
		this._unregisterEvents();
		this.props.onPointerUp && this.props.onPointerUp(event);
	};

	render() {
		return null;
	}
}
