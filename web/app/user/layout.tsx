import { ReactNode } from "react";
import { UserSidebar } from "./UserSidebar";

export default function layout({ children }: { children: ReactNode }) {
	return (
		<div className="flex">
			{children}
			<UserSidebar />
		</div>
	);
}
