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
			pointerdown: [this.props.onPointerDown && this._handlePointerDown],
			pointerenter: [
				this.props.onPointerEnter && this._handlePointerEnter,
				{ passive: true }
			]
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
		this._teardownEvents = registerEvents(window, {
			pointermove: [this.props.onPointerMove, { passive: true }],
			pointerup: [this._handlePointerUp]
		});
		this.props.onPointerDown(event);
	};

	_handlePointerUp = event => {
		this._unregisterEvents();
		this.props.onPointerUp && this.props.onPointerUp(event);
	};

	_handlePointerEnter = event => {
		this._teardownEvents = registerEvents(this.props.host, {
			pointermove: [this.props.onPointerMove, { passive: true }],
			pointerleave: [this._handlePointerLeave, { passive: true }]
		});
		this.props.onPointerEnter(event);
	};

	_handlePointerLeave = event => {
		this._unregisterEvents();
		this.props.onPointerLeave && this.props.onPointerLeave(event);
	};

	render() {
		return null;
	}
}
