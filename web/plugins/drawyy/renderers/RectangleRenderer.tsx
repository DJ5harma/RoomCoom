import { RectangleI } from "../types";

export const RectangleRenderer = ({ rectangle }: { rectangle: RectangleI }) => {
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
			strokeWidth="6"
			fill="blue"
		/>
	);
};
