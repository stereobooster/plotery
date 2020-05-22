import { h, Component } from 'preact';
import { shallowCompare } from '../utils/shallow-compare';
import { PolarAxis } from './polar-axis.component';
import { linearScaler } from '../math/scalers/linear-scaler';
import { estimateLinearStep } from '../math/axes/estimate-linear-step';
import { generateLinearTicks } from '../math/axes/generate-linear-ticks';

export class RadialAxis extends Component {
	shouldComponentUpdate(nextProps) {
		return !shallowCompare(this.props, nextProps, x => x !== 'data');
	}

	render({
		min,
		max,
		step = estimateLinearStep(min, max, 2),
		divisor = 5,
		reference = 0,
		...attrs
	}) {
		return (
			<PolarAxis
				type="r"
				min={min}
				max={max}
				scaler={linearScaler}
				reference={reference}
				ticks={generateLinearTicks(min, max, step, divisor, reference)}
				{...attrs} />
		);
	}
}
