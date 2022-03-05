export function registerEvents(node, desc) {
	const entries = Object.entries(desc).filter(x => x[1][0]);
	entries.forEach(x => node.addEventListener(x[0], x[1][0], x[1][1]));
	return () => entries
		.forEach(x => node.removeEventListener(x[0], x[1][0], x[1][1]));
}
