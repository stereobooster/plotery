export function estimateLinearStep(min, max, count = 10, dividers = [1, 2, 5]) {
	const coarseStep = (max - min) / count;
	const multiplier = Math.pow(10, Math.floor(Math.log10(coarseStep)));
	for (const divider of dividers) {
		if (coarseStep <= divider * multiplier) {
			return divider * multiplier;
		}
	}
	return 10 * multiplier;
}
