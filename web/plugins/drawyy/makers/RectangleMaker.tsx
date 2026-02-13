import { useState } from "react";
import { useElements } from "../providers/ElementsProvider";
import { RectangleI, ElementI, Dims } from "../types";
import { useContainer } from "../providers/ContainerProvider";

export const CircleMaker = ({ myKey }: { myKey: string }) => {
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
				let position = { x: e.clientX, y: e.clientY };
				position = correctElementPosition(position);

				updateMe({ position, dims: { w: 0, h: 0 } });
				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (!isMaking) return;
				let position = { x: e.clientX, y: e.clientY };
				position = correctElementPosition(position);

				const me = getMe();
				const dims = {
					w: me.position.x - position.x,
					h: me.position.y - position.y,
				} as Dims;
				updateMe({ ...me, dims });
			}}
			onMouseUp={() => {
				completeMe();
				setIsMaking(false);
			}}
		/>
	);
};
