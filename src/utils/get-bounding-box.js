export function getBoundingBox(component) {
	const rect = component.base.getBoundingClientRect();
	const { scrollLeft, scrollTop } = document.documentElement;
	return {
		left: rect.left + scrollLeft,
		top: rect.top + scrollTop,
		width: rect.width,
		height: rect.height
	};
}
