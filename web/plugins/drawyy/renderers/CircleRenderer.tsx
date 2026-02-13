import { CircleI } from "../types";

export const CircleRenderer = ({ circle }: { circle: CircleI }) => {
	const {
		position: { x, y },
		radius,
	} = circle;
	return (
		<circle
			cx={x}
			cy={y}
			r={radius}
			stroke="green"
			strokeWidth="4"
			fill="yellow"
		/>
	);
};
