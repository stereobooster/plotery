import { cloneElement } from 'preact';

export const withProps = (children, props) => children.map(x => {
	if (typeof (x && x.nodeName) === 'function') {
		return cloneElement(x, props, withProps(x.children, props));
	}
	return x;
});
