import { linear } from './linear';

export function cardinal(points, tension = 1) {
	if (points.length < 4) {
		return linear(points);
	}
	let path = `M${points[0][0]},${points[0][1]}`;
	for (let i = 1; i < points.length; i++) {
		const [[ax, ay], [bx, by], [cx, cy], [dx, dy]] = [
			points[i - (i === 1 ? 1 : 2)],
			points[i - 1],
			points[i],
			points[i + (i === points.length - 1 ? 0 : 1)]
		];
		path += 'C'
			+ `${tension * (cx - ax + 6 * bx) / 6 + (1 - tension) * cx},`
			+ `${tension * (cy - ay + 6 * by) / 6 + (1 - tension) * cy},`
			+ `${tension * (bx - dx + 6 * cx) / 6 + (1 - tension) * cx},`
			+ `${tension * (by - dy + 6 * cy) / 6 + (1 - tension) * cy},`
			+ `${cx},${cy}`;
	}
	return path;
}
