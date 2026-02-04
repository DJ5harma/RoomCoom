"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { CgClose } from "react-icons/cg";

const context = createContext<{ close: () => void } | null>(null);

export const ModalWrapper = ({
	children,
	Opener,
}: {
	children: ReactNode;
	Opener: ReactNode;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	if (!isOpen) return Opener;

	function close() {
		setIsOpen(false);
	}

	return (
		<div
			className="fixed top-0 left-0 w-screen h-screen bg-[rgba(200, 200, 200, 0.5)] flex justify-center items-center"
			onClick={close}
		>
			<div
				className="relative"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<CgClose className="absolute top-0 right-0" onClick={close} />
				<context.Provider value={{ close }}>{children}</context.Provider>
			</div>
		</div>
	);
};

export const useModal = () => {
	const x = useContext(context);
	if (!x) throw new Error("useModal should be used inside a ModalWrapper");
	return x;
};
