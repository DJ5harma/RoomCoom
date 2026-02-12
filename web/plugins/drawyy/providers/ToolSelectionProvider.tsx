import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { ToolType } from "../types";

type ContextType = {
	selectedTool: ToolType["name"];
	setSelectedTool: Dispatch<SetStateAction<ToolType["name"]>>;
};

const context = createContext<ContextType | null>(null);

export const ToolSelectionProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [selectedTool, setSelectedTool] = useState<ToolType["name"]>("Circle");

	return (
		<context.Provider value={{ selectedTool, setSelectedTool }}>
			{children}
		</context.Provider>
	);
};

export const useToolSelection = () => {
	const x = useContext(context);
	if (!x)
		throw new Error(
			"useToolSelection should be used inside a ToolSelectionProvider",
		);
	return x;
};
