import { PencilI } from "../types";

export const PencilRenderer = ({ pencil }: { pencil: PencilI }) => {
	const { points, design } = pencil;

	const d = points
		.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
		.join(" ");

	return (
		<path
			d={d}
			stroke={design?.strokeColor ?? "white"}
			fill={design?.bgColor ?? "none"}
			strokeWidth={design?.strokeWidth ?? 2}
		/>
	);
};
