import { useRef, useState } from "react";
import { Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";

export const PannerTool = () => {
	const { setOffset } = useContainer();

	const [isMaking, setIsMaking] = useState(false);
	const displaceStartRef = useRef<Vec2>([0, 0]);

	return (
		<div
			className="w-full h-full"
			onMouseDown={(e) => {
				const position = [e.clientX, e.clientY] as Vec2;
				displaceStartRef.current = position;
				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (!isMaking) return;
				const position = [e.clientX, e.clientY] as Vec2;

				const diff = [
					position[0] - displaceStartRef.current[0],
					position[1] - displaceStartRef.current[1],
				];

				displaceStartRef.current = position;

				setOffset((offset) => [offset[0] + diff[0], offset[1] + diff[1]]);
			}}
			onMouseUp={() => {
				setIsMaking(false);
			}}
		/>
	);
};
