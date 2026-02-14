import { useRef, useState } from "react";
import { Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";
import { useElements } from "../providers/ElementsProvider";
import { useNodes } from "../providers/NodesProvider";

export const EraserTool = () => {
	const { correctElementPosition } = useContainer();
	const { deleteElement } = useElements();
	const { nodes } = useNodes();
	const [isMaking, setIsMaking] = useState(false);

	const targetKeysSet = useRef<Set<string>>(new Set());

	function captureEraseTargets(point: Vec2) {
		Object.entries(nodes).forEach(([key, { isPointInside }]) => {
			try {
				if (isPointInside(point)) targetKeysSet.current.add(key);
			} catch (error) {
				console.log({ key });
				console.log(error);
			}
		});
	}

	function eraseTargets() {
		targetKeysSet.current.forEach((key) => deleteElement(key));
		targetKeysSet.current.clear();
	}

	return (
		<div
			className="w-full h-full"
			onMouseDown={() => {
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
