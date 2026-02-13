import { createContext, ReactNode, useContext, useState } from "react";
import { CircleI, ElementI } from "../types";

type ElementsMapType = { [key: string]: { element: ElementI } };

type ContextType = {
	elements: ElementsMapType;
	// setElements: Dispatch<SetStateAction<ElementsMapType>>;
	getElement: (key: string) => ElementI | null;
	updateElement: (key: string, element: ElementI) => void;
	completeElement: (key: string) => void;
};

const context = createContext<ContextType | null>(null);

export const ElementsProvider = ({ children }: { children: ReactNode }) => {
	const [elements, setElements] = useState<ElementsMapType>({
		test: {
			element: {
				name: "circle",
				position: { x: 870, y: 80 },
				radius: 40,
			} as CircleI,
		},
	});

	function updateElement(key: string, element: ElementI) {
		setElements((p) => {
			return { ...p, [key]: { element } };
		});
	}
	function completeElement(key: string) {
		const element = getElement(key);
		if (!element) return;

		const newKey = () => Date.now() + Math.random();

		setElements((p) => {
			delete p[key];
			return { ...p, [newKey()]: { element } };
		});
	}

	function getElement(key: string) {
		return elements[key] ? elements[key].element : null;
	}

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
