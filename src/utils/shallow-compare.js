export function shallowCompare(a, b, isCheck = () => true) {
	if (Object.is(a, b)) {
		return true;
	}
	if (!a || !b) {
		return false;
	}
	for (const key of Object.keys(a)) {
		if (isCheck(key) && !Object.is(a[key], b[key])) {
			return false;
		}
	}
	return true;
}
