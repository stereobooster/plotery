export function getBoundingBox(el) {
	const rect = el.getBoundingClientRect();
	const { scrollLeft, scrollTop } = document.documentElement;
	return {
		left: rect.left + scrollLeft,
		top: rect.top + scrollTop,
		width: rect.width,
		height: rect.height
	};
}
