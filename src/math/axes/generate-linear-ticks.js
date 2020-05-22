export function generateLinearTicks(min, max, step, divisor, reference, closed = true) {
	const ticks = { major: [], minor: [] };
	const minorStep = step / divisor;
	const decimals = Math.max(0, 1 - Math.floor(Math.log10(minorStep)));
	let current = Math.ceil((min - reference) / minorStep) * minorStep + reference;
	while (current < max || (closed && current === max)) {
		const isMajor = Math.round(10 * (current - reference) / step) % 10 === 0;
		(isMajor ? ticks.major : ticks.minor).push(current);
		current = +(current + minorStep).toFixed(decimals);
	}
	return ticks;
}
