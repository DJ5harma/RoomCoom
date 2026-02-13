import { useState } from "react";
import { useElements } from "../providers/ElementsProvider";
import { RectangleI, ElementI, Dims, Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";

export const RectangleMaker = ({ myKey }: { myKey: string }) => {
	const { getElement, updateElement, completeElement } = useElements();
	const { correctElementPosition } = useContainer();

	const name: ElementI["name"] = "rectangle";

	const [isMaking, setIsMaking] = useState(false);

	function updateMe(circle: Omit<RectangleI, "name">) {
		updateElement(myKey, { name, ...circle });
	}
	function completeMe() {
		completeElement(myKey);
	}

	function getMe() {
		return getElement(myKey)! as RectangleI;
	}

	return (
		<div
			className="w-full h-full"
			onMouseDown={(e) => {
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);

				updateMe({ position, dims: { w: 0, h: 0 } });
				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (!isMaking) return;
				let position = [e.clientX, e.clientY] as Vec2;
				position = correctElementPosition(position);

				const me = getMe();
				me.dims = {
					w: -(me.position[0] - position[0]),
					h: -(me.position[1] - position[1]),
				};
				updateMe(me);
			}}
			onMouseUp={() => {
				completeMe();
				setIsMaking(false);
			}}
		/>
	);
};
