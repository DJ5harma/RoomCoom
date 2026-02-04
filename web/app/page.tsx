"use client";

import { NonRoomInstanceSidebar } from "@/entities/instance/InstanceSidebar";
import { useInstancesManager } from "@/entities/instance/InstancesManager";
import { UserDashboard } from "@/entities/user/UserDashboard";
import { uuid } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const searchParams = useSearchParams();
	const instanceId = searchParams.get("instanceId") as uuid;

	const { ShownInstance, activateInstance } = useInstancesManager();

	useEffect(() => {
		if (ShownInstance) activateInstance(instanceId);
	}, [instanceId, ShownInstance, activateInstance]);

	return (
		<div className="w-full h-screen flex items-center">
			{ShownInstance ?? <UserDashboard />}
			<NonRoomInstanceSidebar />
		</div>
	);
}
