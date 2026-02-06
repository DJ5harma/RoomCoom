import { ReactNode } from "react";
import { UserSidebar } from "./UserSidebar";

export default function layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex w-full justify-between">
			{children}
			<UserSidebar />
		</div>
	);
}
