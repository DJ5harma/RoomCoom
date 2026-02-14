import { LineI } from "../types";

export const LineRenderer = ({ line }: { line: LineI }) => {
	const {
		position: [x1, y1],
		end: [x2, y2],
		design,
	} = line;

	return (
		<line
			x1={x1}
			y1={y1}
			x2={x2}
			y2={y2}
			stroke={design?.strokeColor ?? "white"}
			strokeWidth={design?.strokeWidth ?? 2}
		/>
	);
};
