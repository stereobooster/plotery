export function checkModifiers(event, modifiers) {
	const pressed = {
		ctrl: event.ctrlKey,
		alt: event.altKey,
		shift: event.shiftKey
	};
	return !modifiers || modifiers.split('+')
		.reduce((acc, x) => acc & pressed[x], true);
}
