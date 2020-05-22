export const linearScaler = (value, min, max, reverse = false) => reverse
	? (value * (max - min) + min)
	: ((value - min) / (max - min));
