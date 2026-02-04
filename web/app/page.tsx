"use client";

import { NonRoomInstanceSidebar } from "@/entities/instance/InstanceSidebar";
import { useInstancesManager } from "@/entities/instance/InstanceMemory";
import { UserDashboard } from "@/entities/user/UserDashboard";
import { uuid } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const searchParams = useSearchParams();
	const instanceId = searchParams.get("instanceId") as uuid;

	const { ShownInstance, activateInstance, hideCurrentInstance } =
		useInstancesManager();

	useEffect(() => {
		if (!instanceId) {
			hideCurrentInstance();
			return;
		}

	}, [instanceId, ShownInstance, activateInstance]);

	return (
		<div className="w-full h-screen flex items-center">
			{ShownInstance ?? <UserDashboard />}
			<NonRoomInstanceSidebar />
		</div>
	);
}
