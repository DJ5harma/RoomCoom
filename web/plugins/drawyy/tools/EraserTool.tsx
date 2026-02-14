import { useRef, useState } from "react";
import { ElementI, PencilI, Vec2 } from "../types";
import { useContainer } from "../providers/ContainerProvider";
import { useElements } from "../providers/ElementsProvider";
import { useNodes } from "../providers/NodesProvider";

const MIN_DIST = 10; // px - controls density (bigger = fewer points)

export const EraserTool = () => {
	const { correctElementPosition } = useContainer();
	const { deleteElement, updateElement, getElement, keyOfElementInMaking } =
		useElements();
	const { nodes } = useNodes();

	const targetKeysSet = useRef<Set<string>>(new Set());

	function captureEraseTargets(point: Vec2) {
		Object.entries(nodes).forEach(([key, { isPointInside }]) => {
			if (isPointInside(point)) targetKeysSet.current.add(key);
		});
	}

	function eraseTargets() {
		targetKeysSet.current.add(keyOfElementInMaking);
		targetKeysSet.current.forEach((key) => deleteElement(key));
		targetKeysSet.current.clear();
	}
	const name: ElementI["name"] = "pencil";

	const [isMaking, setIsMaking] = useState(false);

	function updateMe(pencil: Omit<PencilI, "name">) {
		updateElement({ name, ...pencil });
	}

	function getMe() {
		return getElement()! as PencilI;
	}

	function dist(a: Vec2, b: Vec2) {
		return Math.hypot(a[0] - b[0], a[1] - b[1]);
	}
	return (
		<div
			className="w-full h-full"
			onMouseDown={(e) => {
				let position: Vec2 = [e.clientX, e.clientY];
				position = correctElementPosition(position);

				updateMe({
					position,
					points: [position],
				});

				setIsMaking(true);
			}}
			onMouseMove={(e) => {
				if (!isMaking) return;

				let position: Vec2 = [e.clientX, e.clientY];
				position = correctElementPosition(position);

				const me = getMe();

				const last = me.points[me.points.length - 1];

				// distance sampling
				if (dist(last, position) < MIN_DIST) return;

				updateMe({
					position: me.position,
					points: [...me.points, position],
				});
				captureEraseTargets(position);
			}}
			onMouseUp={() => {
				eraseTargets();
				setIsMaking(false);
			}}
		/>
	);
};
