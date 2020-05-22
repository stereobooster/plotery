import { h, Component } from 'preact';
import { shallowCompare } from '../utils/shallow-compare';
import { logScaler } from '../math/scalers/log-scaler';
import { estimateLogStep } from '../math/axes/estimate-log-step';
import { generateLogTicks } from '../math/axes/generate-log-ticks';
import { CartesianAxis } from './cartesian-axis.component';

export class LogAxis extends Component {
	shouldComponentUpdate(nextProps) {
		return !shallowCompare(this.props, nextProps, x => x !== 'data');
	}

	render({
		min,
		max,
		reference = 1,
		base = 10,
		step = estimateLogStep(min, max, base),
		divisor = 9,
		...attrs
	}) {
		return (
			<CartesianAxis
				min={min}
				max={max}
				scaler={logScaler}
				reference={reference}
				ticks={generateLogTicks(min, max, step, divisor, reference, base)}
				{...attrs} />
		);
	}
}
