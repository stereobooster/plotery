import { h, Component } from 'preact';
import { bind } from '../utils/bind';
import { shallowCompare } from '../utils/shallow-compare';
import { CartesianAxis } from './cartesian-axis.component';

export class LogAxis extends Component {
	shouldComponentUpdate(nextProps) {
		return !shallowCompare(this.props, nextProps, [
			'rect',
			'type',
			'position',
			'hide',
			'min',
			'max',
			'reference',
			'step',
			'divisor',
			'major',
			'minor',
			'labels'
		]);
	}

	@bind
	scale(value, inverse = false) {
		const { rect, type, min, max } = this.props;
		if (inverse) {
			const normalized = type === 'x' ? value / rect.width : 1 - value / rect.height;
			return min * Math.pow(max / min, normalized);
		}
		else {
			const normalized = Math.log(value / min) / Math.log(max / min);
			return type === 'x' ? normalized * rect.width : (1 - normalized) * rect.height;
		}
	}

	_estimateStep(min, max, count = 10) {
		return Math.max(1, Math.ceil(Math.log10(max / min) / count));
	}

	_generateTicks(min, max, step = this._estimateStep(min, max), divisor = 9, reference = 1) {
		const ticks = { major: [], minor: [] };
		let current = reference
			* Math.pow(10, step * Math.floor(Math.log10(min / reference) / step));
		while (current <= max) {
			const next = current * Math.pow(10, step);
			if (min <= current) {
				ticks.major.push(current);
			}
			const minorStep = (next - current) / divisor;
			for (let i = 0; i < divisor - 1; i++) {
				current += minorStep;
				if (min <= current && current <= max) {
					ticks.minor.push(current);
				}
			}
			current = next;
		}
		return ticks;
	}

	render() {
		const { min, max, reference, step, divisor, ...others } = this.props;
		return (
			<CartesianAxis
					min={min}
					max={max}
					scale={this.scale}
					reference={reference || 1}
					ticks={this._generateTicks(min, max, step, divisor, reference)}
					{...others} />
		);
	}
}
