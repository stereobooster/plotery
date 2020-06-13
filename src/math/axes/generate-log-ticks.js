export function generateLogTicks(min, max, step, divisor, reference, base = 10) {
	const ticks = { major: [], minor: [] };
	const log = Math.log(min / reference) / Math.log(base);
	let current = reference * Math.pow(base, step * Math.floor(log / step));
	while (current <= max) {
		const next = current * Math.pow(base, step);
		if (min <= current) {
			ticks.major.push(current);
		}
		const minorStep = (next - current) / divisor;
		for (let i = 0; i < divisor - 1; i++) {
			current += minorStep;
			if (min <= current && current <= max) {
				ticks.minor.push(current);
			}
		}
		current = next;
	}
	return ticks;
}
