"use client";

import { useInstanceMemory } from "@/entities/instance/InstanceMemory";
import { NonRoomInstanceSidebar } from "@/entities/instance/InstanceSidebar";
import { UserDashboard } from "@/entities/user/UserDashboard";

export default function Page() {
	const { getShownNode } = useInstanceMemory();
	return (
		<div className="w-full h-screen flex items-center">
			{getShownNode() ?? <UserDashboard />}
			<NonRoomInstanceSidebar />
		</div>
	);
}
