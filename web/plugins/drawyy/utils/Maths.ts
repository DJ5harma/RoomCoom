import { Dims, Vec2 } from "../types";

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
	isPointInLine(point: Vec2, lineStart: Vec2, lineEnd: Vec2) {
		const isStrictVertical = lineStart[0] === lineEnd[0];
		if (isStrictVertical) {
			return point[0] === lineStart[0];
		}
		const m = (lineEnd[1] - lineStart[1]) / (lineEnd[0] - lineStart[0]);
		const [x, y] = lineEnd;
		const c = y - m * x;
		return Math.abs(-point[1] + m * point[0] + c) < 5;
	},
	isPointInPencilPath(point: Vec2, pencilPoints: Vec2[]) {
		return false;
	},
};
