import {
	createContext,
	ReactNode,
	RefObject,
	useContext,
	useEffect,
	useRef,
} from "react";

type ContextType = { containerRef: RefObject<SVGSVGElement | null> };

const context = createContext<ContextType | null>(null);

export const ContainerProvider = ({ children }: { children: ReactNode }) => {
	const containerRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		console.log("og:", window.innerWidth, window.innerHeight);

		console.log("w h", containerRef.current.width, containerRef.current.height);
		console.log(
			"cl ct",
			containerRef.current.clientLeft,
			containerRef.current.clientTop,
		);
		console.log(
			"cw ch",
			containerRef.current.clientWidth,
			containerRef.current.clientHeight,
		);
		console.log("c_rects", containerRef.current.getClientRects());
		console.log("bc_rects", containerRef.current.getBoundingClientRect());
	}, [containerRef]);

	return (
		<context.Provider value={{ containerRef }}>{children}</context.Provider>
	);
};

export const useContainer = () => {
	const x = useContext(context);
	if (!x)
		throw new Error("useContainer should be used inside ContainerProvider");
    return x;
};
