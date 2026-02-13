import { createContext, ReactNode, RefObject, useContext, useRef } from "react";
import { Vec2 } from "../types";

type ContextType = {
	containerRef: RefObject<SVGSVGElement | null>;
	correctElementPosition: (position: Vec2) => Vec2;
};

const context = createContext<ContextType | null>(null);

export const ContainerProvider = ({ children }: { children: ReactNode }) => {
	const containerRef = useRef<SVGSVGElement>(null);

	function correctElementPosition(position: Vec2) {
		const rect = containerRef.current!.getBoundingClientRect()!;
		position.x -= rect.x;
		position.y -= rect.y;
		return position;
	}

	return (
		<context.Provider value={{ containerRef, correctElementPosition }}>
			{children}
		</context.Provider>
	);
};

export const useContainer = () => {
	const x = useContext(context);
	if (!x)
		throw new Error("useContainer should be used inside ContainerProvider");
	return x;
};
