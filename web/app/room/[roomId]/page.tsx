"use client";

import { RoomInstanceSidebar } from "@/entities/instance/InstanceSidebar";
import { useInstanceMemory } from "@/entities/instance/InstanceMemory";
import { RoomDashboard } from "@/entities/room/RoomDashboard";
import { uuid } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Instance } from "@/entities/instance/InstanceProvider";

export default function Page() {
	const searchParams = useSearchParams();
	const instanceId = searchParams.get("instanceId") as uuid;

	// const { ShownInstance, activateInstance } = useInstanceMemory();

	// useEffect(() => {
	// 	activateInstance(instanceId);
	// }, [instanceId, activateInstance]);

	return (
		<div className="p-2 w-full h-full flex flex-col items-center">
			{/* <Instance />  */}
			<RoomDashboard />
			<RoomInstanceSidebar />
		</div>
	);
}
