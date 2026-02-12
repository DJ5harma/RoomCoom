import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { ElementI } from "../types";

type ElementsMapType = { [key: number]: { element: ElementI } };

type ContextType = {
	elements: ElementsMapType;
	setElements: Dispatch<SetStateAction<ElementsMapType>>;
};

const context = createContext<ContextType | null>(null);

export const ElementsProvider = ({ children }: { children: ReactNode }) => {
	const [elements, setElements] = useState<ElementsMapType>({});

	return (
		<context.Provider value={{ elements, setElements }}>
			{children}
		</context.Provider>
	);
};

export const useElements = () => {
	const x = useContext(context);
	if (!x) throw new Error("useElements should be used inside ElementsProvider");
	return x;
};
