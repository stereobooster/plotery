export function debounce(callback, delay) {
	let timerId;
	return function (...args) {
		clearTimeout(timerId);
		// eslint-disable-next-line no-invalid-this
		timerId = setTimeout(() => callback.apply(this, args), delay);
	};
}
