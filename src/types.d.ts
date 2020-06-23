import { Component, ComponentChild } from 'preact';

export type ChartSeriesData = [number, number][];
export type ChartData = ChartSeriesData | { [series: string]: ChartSeriesData };
export type Rect = { left: number; top: number; width: number; height: number };

export interface Axis {
	type: string;
	scale: { (value: number, reverse?: boolean): number };
	reference?: number;
	center?: { x: number; y: number };
	radius?: number;
}

export type Axes = { [type: string]: Axis };

export interface ChartAttributes {
	data: ChartData;
	rect: Rect;
	axes: Axes;
	updateAxis: { (axis: Axis): void };
}

export interface ChartProps {
	data: ChartData;
}

export declare class Chart extends Component<ChartProps> {
	render(): ComponentChild;
}

export interface SurfaceProps extends Partial<ChartAttributes> { }

export declare class Surface extends Component<SurfaceProps> {
	updateAxis: { (axis: Axis): void };
	render(): ComponentChild;
}

export interface CartesianAxisProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	type: 'x' | 'y';
	position?: 'start' | 'end';
	scaler: { (value: number, min: number, max: number, reverse?: boolean): number };
	min: number;
	max: number;
	reference: number;
	ticks: { major: number[]; minor: number[] };
	major?: boolean;
	minor?: boolean;
	labels?: string[] | { (tick: number): string };
	hide?: boolean;
}

export declare class CartesianAxis extends Component<CartesianAxisProps> implements Axis {
	type: string;
	scale: { (value: number, reverse?: boolean): number };
	reference: number;
	render(): ComponentChild;
}

export interface LinearAxisProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	type: 'x' | 'y';
	position?: 'start' | 'end';
	min: number;
	max: number;
	reference?: number;
	step?: number;
	divisor?: number;
	major?: boolean;
	minor?: boolean;
	labels?: string[] | { (tick: number): string };
	hide?: boolean;
}

export declare class LinearAxis extends Component<LinearAxisProps> {
	render(): ComponentChild;
}

export interface LogAxisProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	type: 'x' | 'y';
	position?: 'start' | 'end';
	min: number;
	max: number;
	reference?: number;
	base?: number;
	step?: number;
	divisor?: number;
	major?: boolean;
	minor?: boolean;
	labels?: string[] | { (tick: number): string };
	hide?: boolean;
}

export declare class LogAxis extends Component<LogAxisProps> {
	render(): ComponentChild;
}

export interface CartesianLineProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	series?: string;
	interpolate?: { (points: ChartSeriesData): string };
	line?: boolean;
	area?: boolean;
	[attrs: string]: any;
}

export declare class CartesianLine extends Component<CartesianLineProps> {
	render(): ComponentChild;
}

export interface LinearLineProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	series?: string;
	line?: boolean;
	area?: boolean;
	[attrs: string]: any;
}

export declare class LinearLine extends Component<LinearLineProps> {
	render(): ComponentChild;
}

export interface CardinalLineProps extends Partial<ChartAttributes> {
	className?: string;
	class?: string;
	series?: string;
	tension?: number;
	line?: boolean;
	area?: boolean;
	[attrs: string]: any;
}

export declare class CardinalLine extends Component<CardinalLineProps> {
	render(): ComponentChild;
}

export interface BarLineProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	series?: string;
	[attrs: string]: any;
}

export declare class BarLine extends Component<BarLineProps> {
	render(): ComponentChild;
}

export interface PolarAxisProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	type: 'r' | 't';
	scaler: { (value: number, min: number, max: number, reverse?: boolean): number };
	min: number;
	max: number;
	ticks: { major: number[]; minor: number[] };
	major?: boolean;
	minor?: boolean;
	labels?: string[] | { (tick: number): string };
	hide?: boolean;
}

export declare class PolarAxis extends Component<PolarAxisProps> implements Axis {
	type: string;
	scale: { (value: number, reverse?: boolean): number };
	center: { x: number; y: number };
	radius: number;
	render(): ComponentChild;
}

export interface RadialAxisProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	min: number;
	max: number;
	reference?: number;
	step?: number;
	divisor?: number;
	major?: boolean;
	minor?: boolean;
	labels?: string[] | { (tick: number): string };
	hide?: boolean;
}

export declare class RadialAxis extends Component<RadialAxisProps> {
	render(): ComponentChild;
}

export interface AngularAxisProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	min: number;
	max: number;
	reference?: number;
	step?: number;
	divisor?: number;
	major?: boolean;
	minor?: boolean;
	labels?: string[] | { (tick: number): string };
	hide?: boolean;
}

export declare class AngularAxis extends Component<AngularAxisProps> {
	render(): ComponentChild;
}

export interface PolarLineProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	series?: string;
	interpolate: { (points: ChartSeriesData): string };
	[attrs: string]: any;
}

export declare class PolarLine extends Component<PolarLineProps> {
	render(): ComponentChild;
}

export interface PolarSectorProps extends Partial<ChartAttributes> {
	class?: string;
	className?: string;
	series?: string;
	inner?: number;
	outer?: number;
	[attrs: string]: any;
}

export declare class PolarSector extends Component<PolarSectorProps> {
	render(): ComponentChild;
}

export interface ZoomProps extends Partial<ChartAttributes> {
	restrict?: 'x' | 'y';
	onLimits?: { (limits?: number[]): void };
}

export declare class Zoom extends Component<ZoomProps> {
	render(): ComponentChild;
}

export function linear(points: ChartSeriesData): string
export function cardinal(points: ChartSeriesData, tension?: number): string;
export function linearScaler(value: number, min: number, max: number, reverse?: boolean): number;
export function logScaler(value: number, min: number, max: number, reverse?: boolean): number;
export function estimateUniformStep(min: number, max: number, count?: number): number;
export function estimateLinearStep(min: number, max: number, count?: number, dividers?: number[]): number;
export function estimateLogStep(min: number, max: number, base?: number, count?: number): number;
export function generateLinearTicks(min: number, max: number, step: number, divisor: number, reference: number, closed?: boolean): { major: number[]; minor: number[] };
export function generateLogTicks(min: number, max: number, step: number, divisor: number, reference: number, base?: number): { major: number[]; minor: number[] };
