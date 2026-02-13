import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { ElementI } from "../types";
import { socket } from "@/utils/SocketConnector";

type ElementsMapType = { [key: string]: { element: ElementI } };

type ContextType = {
	elements: ElementsMapType;
	// setElements: Dispatch<SetStateAction<ElementsMapType>>;
	getElement: () => ElementI | null;
	updateElement: (element: ElementI) => void;
	completeElement: () => void;
};

const context = createContext<ContextType | null>(null);

const NETWORK_TRANSFER_GAP = 10;

export const ElementsProvider = ({ children }: { children: ReactNode }) => {
	const [elements, setElements] = useState<ElementsMapType>({});

	// eslint-disable-next-line react-hooks/purity
	const localKeyRef = useRef(Date.now() + Math.random());

	const networkGapRef = useRef(0);

	function getElement() {
		return elements[localKeyRef.current]
			? elements[localKeyRef.current].element
			: null;
	}
	function updateElement(
		element: ElementI,
		options?: { forceNetwork?: boolean },
	) {
		setElements((p) => {
			return { ...p, [localKeyRef.current]: { element } };
		});

		if (networkGapRef.current < NETWORK_TRANSFER_GAP) {
			networkGapRef.current++;
			if (options?.forceNetwork) {
				socket.emit("drawyy:element", { key: localKeyRef.current, element });
			}
		} else {
			socket.emit("drawyy:element", { key: localKeyRef.current, element });
			networkGapRef.current = 0;
		}
	}
	function completeElement() {
		const element = getElement();
		if (!element) return;
		updateElement(element, { forceNetwork: true });
		localKeyRef.current = Date.now() + Math.random();
	}

	useEffect(() => {
		socket.on(
			"drawyy:element",
			({ key, element }: { key: string; element: ElementI }) => {
				setElements((p) => {
					return { ...p, [key]: { element } };
				});
			},
		);
		return () => {
			socket.off("drawyy:element");
		};
	}, []);

	return (
		<context.Provider
			value={{ elements, getElement, updateElement, completeElement }}
		>
			{children}
		</context.Provider>
	);
};

export const useElements = () => {
	const x = useContext(context);
	if (!x) throw new Error("useElements should be used inside ElementsProvider");
	return x;
};
