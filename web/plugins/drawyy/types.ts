import { ReactNode } from "react";

export type ToolType = {
	name: "Circle" | "Pencil" | "Rectangle" | "Line";
	icon: ReactNode;
};

export type EntityType = "circle" | "pencil" | "rectangle" | "line";

export type Vec2 = [number, number];
export type Dims = { w: number; h: number };

export interface ElementI {
	name: EntityType;
	position: Vec2;
}
export interface CircleI extends ElementI {
	radius: number;
}
export interface RectangleI extends ElementI {
	dims: Dims;
}
export interface LineI extends ElementI {
	end: Vec2;
}
