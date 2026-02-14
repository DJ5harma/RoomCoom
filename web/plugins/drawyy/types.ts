import { ReactNode } from "react";

export type ToolType = {
	name:
		| "Circle"
		| "Pencil"
		| "Rectangle"
		| "Line"
		| "Pan"
		| "Eraser"
		| "Dustbin";
	icon: ReactNode;
};

export type EntityType = "circle" | "pencil" | "rectangle" | "line";

export type Vec2 = [number, number];
export type Dims = { w: number; h: number };
export type BoundingRect = { topLeft: Vec2; dims: Dims };

export interface DesignI {
	bgColor: string;
    strokeWidth: number;
    strokeColor: string;
}

interface ElementType {
	name: EntityType;
	position: Vec2;
	design?: DesignI;
}
export interface CircleI extends ElementType {
	radius: number;
}
export interface RectangleI extends ElementType {
	dims: Dims;
}
export interface LineI extends ElementType {
	end: Vec2;
}
export interface PencilI extends ElementType {
	points: Vec2[];
}
export type ElementAndedI = CircleI & RectangleI & LineI & PencilI;
export type ElementI = ElementType
