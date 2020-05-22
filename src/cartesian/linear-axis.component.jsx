import { h, Component } from 'preact';
import { shallowCompare } from '../utils/shallow-compare';
import { linearScaler } from '../math/scalers/linear-scaler';
import { estimateLinearStep } from '../math/axes/estimate-linear-step';
import { generateLinearTicks } from '../math/axes/generate-linear-ticks';
import { CartesianAxis } from './cartesian-axis.component';

export class LinearAxis extends Component {
	shouldComponentUpdate(nextProps) {
		return !shallowCompare(this.props, nextProps, x => x !== 'data');
	}

	render({
		min,
		max,
		reference = 0,
		step = estimateLinearStep(min, max),
		divisor = 5,
		...attrs
	}) {
		return (
			<CartesianAxis
				min={min}
				max={max}
				scaler={linearScaler}
				reference={reference}
				ticks={generateLinearTicks(min, max, step, divisor, reference)}
				{...attrs} />
		);
	}
}
