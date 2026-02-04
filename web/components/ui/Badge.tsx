import { ReactNode } from "react";

export const Badge = ({
	className,
	children,
}: {
	className: string;
	children: ReactNode;
}) => {
	return (
		<div className={"py-2 px-4 rounded-lg text-nowrap w-full text-center " + className}>
			{children}
		</div>
	);
};
