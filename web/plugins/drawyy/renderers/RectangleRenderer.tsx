import { RectangleI } from "../types";

export const RectangleRenderer = ({ rectangle }: { rectangle: RectangleI }) => {
	const {
		position: [x, y],
		dims: { w, h },
		design,
	} = rectangle;

	const width = Math.abs(w);
	const height = Math.abs(h);

	const drawX = w < 0 ? x + w : x;
	const drawY = h < 0 ? y + h : y;

	return (
		<rect
			x={drawX}
			y={drawY}
			width={width}
			height={height}
			stroke={design?.strokeColor ?? "white"}
			strokeWidth={design?.strokeWidth ?? 2}
			fill={design?.bgColor ?? "none"}
		/>
	);
};
