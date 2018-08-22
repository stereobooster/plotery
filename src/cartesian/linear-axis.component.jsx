import { h, Component } from 'preact';
import { bind } from '../utils/bind';
import { shallowCompare } from '../utils/shallow-compare';
import { CartesianAxis } from './cartesian-axis.component';

export class LinearAxis extends Component {
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
			return normalized * (max - min) + min;
		}
		else {
			const normalized = (value - min) / (max - min);
			return type === 'x' ? normalized * rect.width : (1 - normalized) * rect.height;
		}
	}

	_estimateStep(min, max, count = 10, dividers = [1, 2, 5]) {
		const coarseStep = (max - min) / count;
		const multiplier = Math.pow(10, Math.floor(Math.log10(coarseStep)));
		for (const divider of dividers) {
			if (coarseStep <= divider * multiplier) {
				return divider * multiplier;
			}
		}
		return 10 * multiplier;
	}

	_generateTicks(min, max, step = this._estimateStep(min, max), divisor = 5, reference = 0) {
		const ticks = { major: [], minor: [] };
		const minorStep = step / divisor;
		const decimals = Math.max(0, 1 - Math.floor(Math.log10(minorStep)));
		let current = Math.ceil((min - reference) / minorStep) * minorStep + reference;
		while (current <= max) {
			const isMajor = Math.round(10 * (current - reference) / step) % 10 === 0;
			(isMajor ? ticks.major : ticks.minor).push(current);
			current = +(current + minorStep).toFixed(decimals);
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
					reference={reference || 0}
					ticks={this._generateTicks(min, max, step, divisor, reference)}
					{...others} />
		);
	}
}
