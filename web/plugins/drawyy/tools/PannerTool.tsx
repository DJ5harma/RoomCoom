import { useRef, useState } from "react";
import { Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";

export const PannerTool = () => {
	const { offset, setOffset } = useContainer();
	const { correctElementPosition } = useContainer();

	const [isMaking, setIsMaking] = useState(false);
	const displaceStartRef = useRef<Vec2>([0,0]);

	return (
		<div
			className="w-full h-full"
			onMouseDown={(e) => {
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);
				displaceStartRef.current = position;
				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (!isMaking) return;
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);

				const diff = [
					position[0] - displaceStartRef.current[0],
					position[1] - displaceStartRef.current[1],
				];

                displaceStartRef.current = position;

				const newOffset = [offset[0] + diff[0], offset[1] + diff[1]] as Vec2;
				setOffset(newOffset);
			}}
			onMouseUp={() => {
				setIsMaking(false);
			}}
		/>
	);
};
