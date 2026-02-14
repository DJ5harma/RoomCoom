import {
	createContext,
	Dispatch,
	ReactNode,
	RefObject,
	SetStateAction,
	useContext,
	useRef,
	useState,
} from "react";
import { Vec2 } from "../types";

type ContextType = {
	offset: Vec2;
	setOffset: Dispatch<SetStateAction<Vec2>>;
	containerRef: RefObject<SVGSVGElement | null>;
	correctElementPosition: (position: Vec2) => Vec2;
};

const context = createContext<ContextType | null>(null);

export const ContainerProvider = ({ children }: { children: ReactNode }) => {
	const containerRef = useRef<SVGSVGElement>(null);

	const [offset, setOffset] = useState<Vec2>([0, 0]);

	function correctElementPosition(position: Vec2) {
		const rect = containerRef.current!.getBoundingClientRect()!;
		position[0] -= rect.x + offset[0];
		position[1] -= rect.y + offset[1];
		return position;
	}

	return (
		<context.Provider
			value={{ containerRef, correctElementPosition, offset, setOffset }}
		>
			<div className="bg-neutral-700 absolute bottom-1 right-1 z-10 p-1 rounded-md select-none">
				({offset[0]}, {offset[1]})
			</div>
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
