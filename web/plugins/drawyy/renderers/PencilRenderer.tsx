import { PencilI } from "../types";

export const PencilRenderer = ({ pencil }: { pencil: PencilI }) => {
	const { points } = pencil;
	
    const d = points
		.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`))
		.join(" ");

	return <path d={d} stroke="yellow" fill="none" strokeWidth={2} />;
};
