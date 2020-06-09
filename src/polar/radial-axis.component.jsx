import { h } from 'preact';
import { pure } from '../utils/pure';
import { PolarAxis } from './polar-axis.component';
import { linearScaler } from '../math/scalers/linear-scaler';
import { estimateLinearStep } from '../math/axes/estimate-linear-step';
import { generateLinearTicks } from '../math/axes/generate-linear-ticks';

export const RadialAxis = pure(({
	min,
	max,
	step = estimateLinearStep(min, max, 2),
	divisor = 5,
	reference = 0,
	...attrs
}) => (
	<PolarAxis
		type="r"
		min={min}
		max={max}
		scaler={linearScaler}
		reference={reference}
		ticks={generateLinearTicks(min, max, step, divisor, reference)}
		{...attrs} />
), x => x !== 'data');
