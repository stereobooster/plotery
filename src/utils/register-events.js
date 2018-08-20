export function registerEvents(node, desc) {
	Object.entries(desc)
		.forEach(x => node.addEventListener(x[0], x[1][0], x[1][1]));
	return () => Object.entries(desc)
		.forEach(x => node.removeEventListener(x[0], x[1][0], x[1][1]));
}
