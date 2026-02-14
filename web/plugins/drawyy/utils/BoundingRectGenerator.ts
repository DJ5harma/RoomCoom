import {
	BoundingRect,
	CircleI,
	EntityType,
	PencilI,
	RectangleI,
} from "../types";

export const BoundingRectGenerator: {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[name: string | EntityType]: (element: any) => BoundingRect;
} = {
	circle: ({ position, radius }: CircleI) => {
		const center = position;
		return {
			topLeft: [center[0] - radius, center[1] - radius],
			dims: { w: 2 * radius, h: 2 * radius },
		};
	},
	rectangle: ({ position, dims }: RectangleI) => {
		return { topLeft: position, dims };
	},
	line: ({ position, dims }: RectangleI) => {
		return { topLeft: position, dims };
	},
	pencil: ({ points }: PencilI) => {
		let x_min = Infinity;
		let x_max = 0;
		let y_min = Infinity;
		let y_max = 0;

		points.forEach(([x, y]) => {
			x_min = Math.min(x_min, x);
			x_max = Math.max(x_max, x);
			y_min = Math.min(y_min, y);
			y_max = Math.max(y_max, y);
		});

		return {
			topLeft: [x_min, y_min],
			dims: { w: x_max - x_min, h: y_max - y_min },
		};
	},
};
