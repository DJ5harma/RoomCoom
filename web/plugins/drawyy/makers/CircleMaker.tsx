import { useState } from "react";
import { useElements } from "../providers/ElementsProvider";
import { CircleI, ElementI, Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";

export const CircleMaker = () => {
	const { getElement, updateElement, completeElement } = useElements();
	const { correctElementPosition } = useContainer();

	const name: ElementI["name"] = "circle";

	const [isMaking, setIsMaking] = useState(false);

	function updateMe(circle: Omit<CircleI, "name">) {
		updateElement({ name, ...circle });
	}
	function completeMe() {
		completeElement();
	}

	function getMe() {
		return getElement()! as CircleI;
	}

	return (
		<div
			className="w-full h-full"
			onMouseDown={(e) => {
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);

				updateMe({ position, radius: 0 });
				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (!isMaking) return;
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);

				const me = getMe();
				me.radius = Math.sqrt(
					Math.pow(me.position[0] - position[0], 2) +
						Math.pow(me.position[1] - position[1], 2),
				);
				updateMe(me);
			}}
			onMouseUp={() => {
				completeMe();
				setIsMaking(false);
			}}
		/>
	);
};
