import { createContext, ReactNode, useContext, useState } from "react";
import { ElementI } from "../types";

type ElementsMapType = { [key: number]: { element: ElementI } };

type ContextType = {
	elements: ElementsMapType;
	// setElements: Dispatch<SetStateAction<ElementsMapType>>;
	getElement: (key: number) => ElementI;
	updateElement: (key: number, element: ElementI) => void;
};

const context = createContext<ContextType | null>(null);

export const ElementsProvider = ({ children }: { children: ReactNode }) => {
	const [elements, setElements] = useState<ElementsMapType>({});

	function updateElement(key: number, element: ElementI) {
		setElements((p) => {
			return { ...p, [key]: { element } };
		});
	}

	function getElement(key: number) {
		return elements[key].element;
	}

	return (
		<context.Provider value={{ elements, getElement, updateElement }}>
			{children}
		</context.Provider>
	);
};

export const useElements = () => {
	const x = useContext(context);
	if (!x) throw new Error("useElements should be used inside ElementsProvider");
	return x;
};
