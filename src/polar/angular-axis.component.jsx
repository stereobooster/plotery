import { h, Component } from 'preact';
import { shallowCompare } from '../utils/shallow-compare';
import { PolarAxis } from './polar-axis.component';
import { linearScaler } from '../math/scalers/linear-scaler';
import { estimateUniformStep } from '../math/axes/estimate-uniform-step';
import { generateLinearTicks } from '../math/axes/generate-linear-ticks';

export class AngularAxis extends Component {
	shouldComponentUpdate(nextProps) {
		return !shallowCompare(this.props, nextProps, x => x !== 'data');
	}

	render({
		min,
		max,
		step = estimateUniformStep(min, max),
		divisor = 3,
		reference = 0,
		...attrs
	}) {
		return (
			<PolarAxis
				type="t"
				min={min}
				max={max}
				scaler={linearScaler}
				reference={reference}
				ticks={generateLinearTicks(min, max, step, divisor, reference, false)}
				{...attrs} />
		);
	}
}
