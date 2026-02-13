import { RectangleI } from "../types";

export const CircleRenderer = ({ rectangle }: { rectangle: RectangleI }) => {
	const {
		position: { x, y },
		dims: { w, h },
	} = rectangle;
	return (
		<rect
			x={x}
			y={y}
			width={w}
			height={h}
			stroke="red"
			stroke-width="6"
			fill="blue"
		/>
	);
};
