import { createContext, ReactNode, useContext } from "react";
import { useElements } from "./ElementsProvider";
import { CircleRenderer } from "../renderers/CircleRenderer";
import {
	BoundingRect,
	CircleI,
	LineI,
	PencilI,
	RectangleI,
	Vec2,
} from "../types";
import { RectangleRenderer } from "../renderers/RectangleRenderer";
import { LineRenderer } from "../renderers/LineRenderer";
import { PencilRenderer } from "../renderers/PencilRenderer";
import { BoundingRectGenerator } from "../utils/BoundingRectGenerator";
import { Maths } from "../utils/Maths";

type ContextType = {
	nodes: {
		[key: string]: {
			node: ReactNode;
			boundingRect: BoundingRect;
			isPointInside: (point: Vec2) => boolean;
		};
	};
};
const context = createContext<ContextType | null>(null);

export const NodesProvider = ({ children }: { children: ReactNode }) => {
	const { elements } = useElements();

	const nodes: ContextType["nodes"] = {};

	const entries = Object.entries(elements);
	entries.forEach(([key, { element }]) => {
		let e;
		let isPointInside = null;

		const boundingRect = BoundingRectGenerator[element.name](element);

		switch (element.name) {
			case "circle":
				const circle = element as CircleI;
				e = <CircleRenderer circle={circle} />;
				isPointInside = (point: Vec2) =>
					Maths.isPointInCircle(point, circle.position, circle.radius);
				break;
			case "rectangle":
				const rectangle = element as RectangleI;
				e = <RectangleRenderer rectangle={rectangle} />;
				isPointInside = (point: Vec2) =>
					Maths.isPointInRectangle(point, rectangle.position, rectangle.dims);
				break;
			case "line":
				const line = element as LineI;
				e = <LineRenderer line={line} />;
				isPointInside = (point: Vec2) => {
					if (
						!Maths.isPointInRectangle(
							point,
							boundingRect.topLeft,
							boundingRect.dims,
						)
					) {
						return false;
					}
					return Maths.isPointInLine(point, line.position, line.end);
				};
				break;
			case "pencil":
				const pencil = element as PencilI;
				e = <PencilRenderer pencil={pencil} />;
				isPointInside = (point: Vec2) => {
					if (
						!Maths.isPointInRectangle(
							point,
							boundingRect.topLeft,
							boundingRect.dims,
						)
					) {
						return false;
					}
					return Maths.isPointInPencilPath(point, pencil.points);
				};
				break;
		}
		nodes[key] = {
			node: e,
			boundingRect,
			isPointInside,
		};
	});
	console.log(nodes);

	return <context.Provider value={{ nodes }}>{children}</context.Provider>;
};

export const useNodes = () => {
	const x = useContext(context);
	if (!x) throw new Error("useNodes should be used inside NodesProvider");
	return x;
};
