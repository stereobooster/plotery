export const linear = points => points.reduce(
	(acc, x) => `${acc}${acc ? 'L' : 'M'}${x[0]},${x[1]}`,
	''
);
