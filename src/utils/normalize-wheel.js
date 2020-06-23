export function normalizeWheel(event) {
	let scale = 1;
	switch (event.deltaMode) {
		case WheelEvent.DOM_DELTA_PAGE:
			scale = 800;
			break;
		case WheelEvent.DOM_DELTA_LINE:
			scale = 40;
			break;
		case WheelEvent.DOM_DELTA_PIXEL:
			scale = 1;
			break;
	}
	return event.deltaY * scale;
}
