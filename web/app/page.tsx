"use client";

import { NonRoomInstanceSidebar } from "@/entities/instance/InstanceSidebar";
import { UserDashboard } from "@/entities/user/UserDashboard";
import { Instance } from "@/entities/instance/Instance";

export default function Page() {
	return (
		<div className="w-full h-screen flex items-center">
			<Instance />
			<UserDashboard />
			<NonRoomInstanceSidebar />
		</div>
	);
}
