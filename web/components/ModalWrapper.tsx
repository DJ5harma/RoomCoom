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

	const open = () => setIsOpen(true);
	const close = () => setIsOpen(false);

	return (
		<>
			<div className="w-full h-full" onClick={open}>{Opener}</div>
			{isOpen && (
				<div
					className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center"
					style={{ background: "rgba(200, 200, 200, 0.5)" }}
					onClick={close}
				>
					<div
						className="relative bg-black p-4"
						onClick={(e) => {
							e.stopPropagation();
						}}
					>
						<CgClose
							className="absolute top-4 right-4 text-red-400"
							size={20}
							onClick={close}
						/>
						<div className="p-4">
							<context.Provider value={{ close }}>{children}</context.Provider>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export const useModal = () => {
	const x = useContext(context);
	if (!x) throw new Error("useModal should be used inside a ModalWrapper");
	return x;
};
