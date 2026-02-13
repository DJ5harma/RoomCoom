import { useRef, useState } from "react";
import { useElements } from "../providers/ElementsProvider";
import { RectangleI, ElementI, Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";

export const RectangleMaker = () => {
	const { updateElement, completeElement } = useElements();
	const { correctElementPosition } = useContainer();

	const name: ElementI["name"] = "rectangle";

	const [isMaking, setIsMaking] = useState(false);

	const startRef = useRef<Vec2 | null>(null);

	function updateMe(circle: Omit<RectangleI, "name">) {
		updateElement({ name, ...circle });
	}
	function completeMe() {
		completeElement();
	}

	return (
		<div
			className="w-full h-full"
			onMouseDown={(e) => {
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);

				startRef.current = position;

				updateMe({ position, dims: { w: 0, h: 0 } });
				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (!isMaking || !startRef.current) return;

				let current = [e.clientX, e.clientY] as Vec2;
				current = correctElementPosition(current);

				const start = startRef.current;

				const left = Math.min(start[0], current[0]);
				const top = Math.min(start[1], current[1]);

				const w = Math.abs(current[0] - start[0]);
				const h = Math.abs(current[1] - start[1]);

				updateMe({
					position: [left, top],
					dims: { w, h },
				});
			}}
			onMouseUp={() => {
				completeMe();
				setIsMaking(false);
				startRef.current = null;
			}}
		/>
	);
};
