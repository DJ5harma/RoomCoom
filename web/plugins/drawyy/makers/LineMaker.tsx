import { useState } from "react";
import { useElements } from "../providers/ElementsProvider";
import { ElementI, LineI, Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";

export const LineMaker = () => {
	const { getElement, updateElement, completeElement } = useElements();
	const { correctElementPosition } = useContainer();

	const name: ElementI["name"] = "line";

	const [isMaking, setIsMaking] = useState(false);

	function updateMe(line: Omit<LineI, "name">) {
		updateElement({ name, ...line });
	}
	function completeMe() {
		completeElement();
	}

	function getMe() {
		return getElement()! as LineI;
	}

	return (
		<div
			className="w-full h-full"
			onMouseDown={(e) => {
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);

				updateMe({ position, end: position });
				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (!isMaking) return;
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);

				const me = getMe();
				me.end = position;
				updateMe(me);
			}}
			onMouseUp={() => {
				completeMe();
				setIsMaking(false);
			}}
		/>
	);
};
