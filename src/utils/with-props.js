import { toChildArray, cloneElement } from 'preact';

export const withProps = (children, props) => toChildArray(children).map(x => {
	if (typeof (x && x.type) === 'function') {
		return cloneElement(x, props, withProps(x.props.children, props));
	}
	return x;
});
