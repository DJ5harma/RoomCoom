import { Dims, Vec2 } from "./types";

export const Maths = {
	isPointInCircle(point: Vec2, c_center: Vec2, c_radius: number) {
		const distFromCenterSquared =
			Math.pow(point[0] - c_center[0], 2) + Math.pow(point[1] - c_center[1], 2);
		return distFromCenterSquared <= Math.pow(c_radius, 2);
	},
	isPointInRectangle(point: Vec2, topLeft: Vec2, dims: Dims) {
		const [x, y] = topLeft;
		const { w, h } = dims;

		return (
			point[0] >= x && point[0] <= x + w && point[1] >= y && point[1] <= y + h
		);
	},
};
