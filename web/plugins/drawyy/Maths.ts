import { Dims, Vec2 } from "./types";

export const Maths = {
	isPointInCircle(point: Vec2, c_center: Vec2, c_radius: number) {
		const distFromCenterSquared =
			Math.pow(point[0] - c_center[0], 2) + Math.pow(point[1] - c_center[1], 2);
		return distFromCenterSquared < Math.pow(c_radius, 2);
	},
	isPointInRectangle(point: Vec2, topLeft: Vec2, dims: Dims) {
		const [x, y] = topLeft;
		const { w, h } = dims;

		const leftX = w < 0 ? w : x;
		const topY = h < 0 ? h : y;

		const width = Math.abs(w);
		const height = Math.abs(h);
		return (
			point[0] > leftX &&
			point[0] < leftX + width &&
			point[1] > topY &&
			point[1] < topY + height
		);
	},
};
