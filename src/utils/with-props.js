import { cloneElement } from 'preact';

export function withProps(children, props) {
	return children.map(x => {
		if (typeof (x && x.nodeName) === 'function') {
			return cloneElement(x, props, withProps(x.children, props));
		}
		return x;
	});
}
