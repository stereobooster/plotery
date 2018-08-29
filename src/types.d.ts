import { Component, ComponentChild } from 'preact';

export type ChartSeriesData = [number, number][];
export type ChartData = ChartSeriesData | { [series: string]: ChartSeriesData };
export type Rect = { left: number; top: number; width: number; height: number };

export interface Axis {
	type: string;
	scale: { (value: number, inverse?: boolean): number };
	reference: number;
}

export type Axes = { [type: string]: Axis };

export interface ChartAttributes {
	data: ChartData;
	rect: Rect;
	axes: Axes;
	registerAxis: { (axis: Axis): void };
}

export interface ChartProps {
	data: ChartData;
}

export declare class Chart extends Component<ChartProps> {
	render(): ComponentChild;
}

export interface SurfaceProps extends Partial<ChartAttributes> { }

export declare class Surface extends Component<SurfaceProps> {
	registerAxis: { (axis: Axis): void };
	render(): ComponentChild;
}

export interface CartesianAxisProps extends Partial<ChartAttributes> {
	type: 'x' | 'y';
	scale: { (value: number, inverse?: boolean): number };
	position?: 'start' | 'end';
	hide?: boolean;
	min: number;
	max: number;
	reference: number;
	ticks: { major: number[]; minor: number[] };
	major?: boolean;
	minor?: boolean;
	labels?: string[] | { (tick: number): string };
}

export declare class CartesianAxis extends Component<CartesianAxisProps> implements Axis {
	type: string;
	scale: { (value: number, inverse?: boolean): number };
	reference: number;
	render(): ComponentChild;
}

export interface LinearAxisProps extends Partial<ChartAttributes> {
	type: 'x' | 'y';
	position?: 'start' | 'end';
	hide?: boolean;
	min: number;
	max: number;
	reference?: number;
	step?: number;
	divisor?: number;
	major?: boolean;
	minor?: boolean;
	labels?: string[] | { (tick: number): string };
}

export declare class LinearAxis extends Component<LinearAxisProps> {
	scale(value: number, inverse?: boolean): number;
	render(): ComponentChild;
}

export interface LogAxisProps extends Partial<ChartAttributes> {
	type: 'x' | 'y';
	position?: 'start' | 'end';
	hide?: boolean;
	min: number;
	max: number;
	reference?: number;
	step?: number;
	divisor?: number;
	major?: boolean;
	minor?: boolean;
	labels?: string[] | { (tick: number): string };
}

export declare class LogAxis extends Component<LogAxisProps> {
	scale(value: number, inverse?: boolean): number;
	render(): ComponentChild;
}

export interface LinearLineProps extends Partial<ChartAttributes> {
	series?: string;
	line?: boolean;
	area?: boolean;
}

export declare class LinearLine extends Component<LinearLineProps> {
	render(): ComponentChild;
}

export interface BarLineProps extends Partial<ChartAttributes> {
	series?: string;
}

export declare class BarLine extends Component<BarLineProps> {
	render(): ComponentChild;
}

export interface ZoomProps extends Partial<ChartAttributes> {
	restrict?: 'x' | 'y';
	onZoom?: { (limits?: number[]): void };
}

export declare class Zoom extends Component<ZoomProps> {
	render(): ComponentChild;
}
