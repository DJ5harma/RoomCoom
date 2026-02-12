import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

type ContextType = {
	containerSize: { width: number; height: number };
};

const context = createContext<ContextType | null>(null);

export const ContainerProvider = ({ children }: { children: ReactNode }) => {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		const resize = () => {
			if (!containerRef.current) return;

			setContainerSize({
				width: containerRef.current.clientWidth,
				height: containerRef.current.clientHeight,
			});
		};

		resize();

		const observer = new ResizeObserver(resize);
		observer.observe(containerRef.current!);

		return () => observer.disconnect();
	}, []);
	return (
		<div ref={containerRef} className="h-full relative">
			<context.Provider value={{ containerSize }}>{children}</context.Provider>
		</div>
	);
};

export const useContainer = () => {
	const x = useContext(context);
	if (!x) throw new Error("useContainer should be used inside a Container");
	return x;
};
