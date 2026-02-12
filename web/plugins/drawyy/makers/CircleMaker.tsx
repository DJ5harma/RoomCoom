import { useState } from "react";
import { useElements } from "../providers/ElementsProvider";
import { CircleI, ElementI } from "../types";

export const CircleMaker = ({ myKey }: { myKey: number }) => {
	const { getElement, updateElement } = useElements();

	const name: ElementI["name"] = "circle";

	const [isMaking, setIsMaking] = useState(false);

	function updateMe(circle: Omit<CircleI, "name">) {
		updateElement(myKey, { name, ...circle });
	}
	function getMe() {
		return getElement(myKey) as CircleI;
	}

	return (
		<div
			className="w-full h-full"
			onMouseDown={(e) => {
				const position = { x: e.clientX, y: e.clientY };
				updateMe({ position, radius: 0 });
				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (isMaking) return;
				const position = { x: e.clientX, y: e.clientY };
				const me = getMe();
				const radius = Math.sqrt(
					Math.pow(me.position.x - position.x, 2) +
						Math.pow(me.position.y - position.y, 2),
				);
				updateMe({ ...me, radius });
			}}
			onMouseUp={() => {
				setIsMaking(false);
			}}
		/>
	);
};
