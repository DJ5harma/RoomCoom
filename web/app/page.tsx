"use client";

import { RoomInstanceSidebar } from "@/entities/instance/InstanceSidebar";
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
		activateInstance(instanceId);
	}, [instanceId, activateInstance]);

	return (
		<div className="p-2 w-full h-full flex flex-col items-center">
			{ShownInstance ?? <UserDashboard />}
			<RoomInstanceSidebar />
		</div>
	);
}
