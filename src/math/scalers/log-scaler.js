export const logScaler = (value, min, max, reverse = false) => reverse
	? (min * Math.pow(max / min, value))
	: (Math.log(value / min) / Math.log(max / min));
