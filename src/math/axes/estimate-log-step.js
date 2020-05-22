export const estimateLogStep = (min, max, base, count = 10) => Math.max(
	1,
	Math.ceil(Math.log(max / min) / (Math.log(base) * count))
);
