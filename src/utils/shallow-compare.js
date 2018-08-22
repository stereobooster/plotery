export function shallowCompare(a, b, keys) {
	if (a === b) {
		return true;
	}
	if (!a || !b) {
		return false;
	}
	if (!keys) {
		keys = Object.keys(a);
	}
	for (const key of keys) {
		if (a[key] !== b[key]) {
			return false;
		}
	}
	return true;
}
