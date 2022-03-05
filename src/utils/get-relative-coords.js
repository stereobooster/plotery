function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

export function getRelativeCoords(event, rect) {
	return [
		clamp(event.pageX - rect.left, 0, rect.width),
		clamp(event.pageY - rect.top, 0, rect.height)
	];
}
