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
		const { rect, min, max } = this.props;
		if (inverse) {
			let normalized;
			if (this.props.type === 'x') {
				normalized = value / rect.width;
			}
			else {
				normalized = 1 - value / rect.height;
			}
			return normalized * (max - min) + min;
		}
		else {
			const normalized = (value - min) / (max - min);
			if (this.props.type === 'x') {
				return rect.width * normalized;
			}
			else {
				return rect.height * (1 - normalized);
			}
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
			if (Math.round(10 * (current - reference) / step) % 10 === 0) {
				ticks.major.push(current);
			}
			else {
				ticks.minor.push(current);
			}
			current = +(current + minorStep).toFixed(decimals);
		}
		return ticks;
	}

	render() {
		const { min, max, reference, step, divisor } = this.props;
		return (
			<CartesianAxis
					hide={this.props.hide}
					type={this.props.type}
					position={this.props.position}
					min={min}
					max={max}
					scale={this.scale}
					reference={reference || 0}
					ticks={this._generateTicks(min, max, step, divisor, reference)}
					major={this.props.major}
					minor={this.props.minor}
					labels={this.props.labels}
					rect={this.props.rect}
					registerAxis={this.props.registerAxis} />
		);
	}
}
