import { createContext, ReactNode, useContext } from "react";
import { useElements } from "./ElementsProvider";
import { CircleRenderer } from "../renderers/CircleRenderer";
import { CircleI, LineI, PencilI, RectangleI } from "../types";
import { RectangleRenderer } from "../renderers/RectangleRenderer";
import { LineRenderer } from "../renderers/LineRenderer";
import { PencilRenderer } from "../renderers/PencilRenderer";

type ContextType = {
	nodes: { [key: string]: ReactNode };
};
const context = createContext<ContextType | null>(null);

export const NodesProvider = ({ children }: { children: ReactNode }) => {
	const { elements } = useElements();

	const nodes: ContextType["nodes"] = {};

	const entries = Object.entries(elements);
	entries.forEach(([key, { element }]) => {
		let e;
		switch (element.name) {
			case "circle":
				e = <CircleRenderer circle={element as CircleI} />;
				break;
			case "rectangle":
				e = <RectangleRenderer rectangle={element as RectangleI} />;
				break;
			case "line":
				e = <LineRenderer line={element as LineI} />;
				break;
			case "pencil":
				e = <PencilRenderer pencil={element as PencilI} />;
				break;
		}
		nodes[key] = e;
	});
	return <context.Provider value={{ nodes }}>{children}</context.Provider>;
};

export const useNodes = () => {
	const x = useContext(context);
	if (!x) throw new Error("useNodes should be used inside NodesProvider");
	return x;
};
