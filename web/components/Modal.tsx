import { AppError } from "@/utils/AppError";
import { createContext, ReactNode, useContext, useState } from "react";

const context = createContext<{ close: () => void } | null>(null);

export const ModelWrapper = ({
	children,
	Opener,
}: {
	children: ReactNode;
	Opener: ReactNode;
}) => {
    
    return (
        <context.Provider
        value={{
            close() {
                setIsOpen(false);
            },
        }}
		>
			{isOpen && children}
			<div onClick={() => setIsOpen(true)}>{Opener}</div>
		</context.Provider>
	);
};

export const Modal = ({ children }: { children: ReactNode }) => {
    const { close } = useModal();
    const [isOpen, setIsOpen] = useState(false);
	return (
		<div
			className="bg-[rgba(200,200,200,0.7)] fixed top-0 left-0 h-screen w-screen flex justify-center items-center"
			onClick={() => setIsOpen(false)}
		>
			<div
				className="w-1/2 h-1/2 border-2 bg-white rounded-2xl border-red-400 flex justify-center items-center p-4"
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export const useModal = () => {
	const x = useContext(context);
	if (!x) throw new AppError("Can only use useModal in a ModalWrapper");
	return x;
};
