import { useState } from "react";
import { CircleI, Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";
import { useElements } from "../providers/ElementsProvider";
import { Maths } from "../Maths";

export const EraserTool = () => {
	const { correctElementPosition } = useContainer();
	const { elements, deleteElement } = useElements();
	const [isMaking, setIsMaking] = useState(false);

	const elementsEntries = Object.entries(elements);

	function tryErasing(point: Vec2) {
		for (let i = elementsEntries.length - 1; i > -1; --i) {
			const [key, { element }] = elementsEntries[i];

			switch (element.name) {
				case "circle":
					const circle = element as CircleI;
					if (Maths.isPointInCircle(point, circle.position, circle.radius)) {
						deleteElement(key);
						console.log("DELETING", element.name);
						
						return;
					}
					break;

				default:
			}
		}
	}

	return (
		<div
			className="w-full h-full"
			onMouseDown={(e) => {
				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (!isMaking) return;
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);
				tryErasing(position);
			}}
			onMouseUp={() => {
				setIsMaking(false);
			}}
		/>
	);
};
