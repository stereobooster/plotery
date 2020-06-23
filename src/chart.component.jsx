import { h, Component } from 'preact';
import { debounce } from './utils/debounce';
import { withProps } from './utils/with-props';
import { getBoundingBox } from './utils/get-bounding-box';
import { shallowCompare } from './utils/shallow-compare';
import { registerEvents } from './utils/register-events';
import { Surface } from './surface.component';

export class Chart extends Component {
	_ref = null;
	_teardownEvents = null;

	componentDidMount() {
		this._teardownEvents = registerEvents(window, {
			resize: [debounce(this._updateRect, 100), { passive: true }]
		});
		this._updateRect();
	}

	componentWillUnmount() {
		this._teardownEvents && this._teardownEvents();
	}

	_setRef = el => this._ref = el;

	_updateRect = () => {
		const rect = getBoundingBox(this._ref);
		if (!shallowCompare(this.state.rect, rect)) {
			this.setState({ rect });
		}
	};

	render({ children, data }, { rect }) {
		const host = this._ref;
		return (
			<div className="plotery">
				<svg overflow="visible" ref={this._setRef}>
					<Surface>
						{host && rect && withProps(children, { data, rect, host })}
					</Surface>
				</svg>
			</div>
		);
	}
}
