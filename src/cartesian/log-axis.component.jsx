import { h } from 'preact';
import { pure } from '../utils/pure';
import { logScaler } from '../math/scalers/log-scaler';
import { estimateLogStep } from '../math/axes/estimate-log-step';
import { generateLogTicks } from '../math/axes/generate-log-ticks';
import { CartesianAxis } from './cartesian-axis.component';

export const LogAxis = pure(({
	min,
	max,
	reference = 1,
	base = 10,
	step = estimateLogStep(min, max, base),
	divisor = 9,
	...attrs
}) => (
	<CartesianAxis
		min={min}
		max={max}
		scaler={logScaler}
		reference={reference}
		ticks={generateLogTicks(min, max, step, divisor, reference, base)}
		{...attrs} />
), x => x !== 'data');
