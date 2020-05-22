// eslint-disable-next-line object-shorthand
export const bind = (target, propertyKey, descriptor) => ({
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
});
