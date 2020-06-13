import { h } from 'preact';
import { pure } from '../utils/pure';
import { PolarAxis } from './polar-axis.component';
import { linearScaler } from '../math/scalers/linear-scaler';
import { estimateUniformStep } from '../math/axes/estimate-uniform-step';
import { generateLinearTicks } from '../math/axes/generate-linear-ticks';

export const AngularAxis = pure(({
	min,
	max,
	step = estimateUniformStep(min, max),
	divisor = 3,
	reference = 0,
	...attrs
}) => (
	<PolarAxis
		type="t"
		min={min}
		max={max}
		scaler={linearScaler}
		ticks={generateLinearTicks(min, max, step, divisor, reference, false)}
		{...attrs} />
), x => x !== 'data');
