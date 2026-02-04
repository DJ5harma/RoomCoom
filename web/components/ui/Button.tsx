import { ReactNode } from "react";

export const Button = ({
	className,
	children,
}: {
	className: string;
	children: ReactNode;
}) => {
	return (
		<div className={"py-2 px-4 rounded-lg text-nowrap w-full cursor-pointer hover:bg-black text-center " + className}>
			{children}
		</div>
	);
};
