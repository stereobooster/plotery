import { h } from 'preact';
import { pure } from '../utils/pure';
import { linearScaler } from '../math/scalers/linear-scaler';
import { estimateLinearStep } from '../math/axes/estimate-linear-step';
import { generateLinearTicks } from '../math/axes/generate-linear-ticks';
import { CartesianAxis } from './cartesian-axis.component';

export const LinearAxis = pure(({
	min,
	max,
	reference = 0,
	step = estimateLinearStep(min, max),
	divisor = 5,
	...attrs
}) => (
	<CartesianAxis
		min={min}
		max={max}
		scaler={linearScaler}
		reference={reference}
		ticks={generateLinearTicks(min, max, step, divisor, reference)}
		{...attrs} />
), x => x !== 'data');
