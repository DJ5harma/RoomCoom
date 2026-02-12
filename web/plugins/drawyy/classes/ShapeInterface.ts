export type Vec2 = { x: number; y: number };

export interface ShapeI {
	position: Vec2;
}
export interface CircleI extends ShapeI {
	radius: number;
	center: Vec2;
}
