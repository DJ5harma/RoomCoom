import { CircleI } from "../types";

export const CircleRenderer = ({ circle }: { circle: CircleI }) => {
	const {
		position: [x, y],
		radius,
		design,
	} = circle;

	return (
		<circle
			cx={x}
			cy={y}
			r={radius}
			stroke={design?.strokeColor ?? "white"}
			strokeWidth={design?.strokeWidth ?? 4}
			fill={design?.bgColor ?? "none"}
		/>
	);
};
