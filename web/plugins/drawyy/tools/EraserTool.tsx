import { useRef, useState } from "react";
import { CircleI, RectangleI, Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";
import { useElements } from "../providers/ElementsProvider";
import { Maths } from "../Maths";

export const EraserTool = () => {
	const { correctElementPosition } = useContainer();
	const { elements, deleteElement } = useElements();
	const [isMaking, setIsMaking] = useState(false);

	const elementsEntries = Object.entries(elements);

	const targetKeysSet = useRef<Set<string>>(new Set());

	function captureEraseTargets(point: Vec2) {
		for (let i = elementsEntries.length - 1; i > -1; --i) {
			if (!elementsEntries[i]) return;
			const [key, { element }] = elementsEntries[i];
			if (!element) console.log({ element }, elementsEntries, i, elements);

			switch (element.name) {
				case "circle":
					const circle = element as CircleI;
					if (Maths.isPointInCircle(point, circle.position, circle.radius)) {
						targetKeysSet.current.add(key);
						return;
					}
					break;
				case "rectangle":
					const rectangle = element as RectangleI;
					if (
						Maths.isPointInRectangle(point, rectangle.position, rectangle.dims)
					) {
						targetKeysSet.current.add(key);
						return;
					}
					break;

				default:
			}
		}
	}

	function eraseTargets() {
		targetKeysSet.current.forEach((key) => deleteElement(key));
		targetKeysSet.current.clear();
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
				captureEraseTargets(position);
			}}
			onMouseUp={() => {
				eraseTargets();
				setIsMaking(false);
			}}
		/>
	);
};
