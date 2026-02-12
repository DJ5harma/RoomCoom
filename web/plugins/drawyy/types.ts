import { ReactNode } from "react";

export type ToolType = {
    name: "Circle" | "Pencil" | "Rectangle";
    icon: ReactNode;
};



export type EntityType = "circle" | "pencil" | "rectangle";

export type Vec2 = { x: number; y: number };

export interface ElementI {
    name: EntityType;
	position: Vec2;
}
export interface CircleI extends ElementI {
	radius: number;
}
