export function bind(target, propertyKey, descriptor) {
	// eslint-disable-next-line object-shorthand
	return {
		configurable: true,
		get() {
			const bound = descriptor.value.bind(this);
			Object.defineProperty(this, propertyKey, {
				value: bound,
				configurable: true,
				writable: true
			});
			return bound;
		}
	};
}
