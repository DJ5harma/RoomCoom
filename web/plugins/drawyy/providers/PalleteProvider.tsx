import React, {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";
import { DesignI } from "../types";

type ContextType = {
	design: DesignI;
	setDesign: Dispatch<SetStateAction<DesignI>>;
};

const context = createContext<ContextType | null>(null);

export const PalleteProvider = ({ children }: { children: ReactNode }) => {
	const [design, setDesign] = useState<DesignI>({
		bgColor: "rgb(200,100,100)",
		strokeColor: "rgb(255,255,255)",
		strokeWidth: 5,
	});

	return (
		<context.Provider
			value={{
				design,
				setDesign,
			}}
		>
			{children}
		</context.Provider>
	);
};

export const usePallete = () => {
	const x = useContext(context);
	if (!x) throw new Error("usePallete should be used inside PalleteProvider");
	return x;
};
