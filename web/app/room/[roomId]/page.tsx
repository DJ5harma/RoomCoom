"use client";

import { InstanceSidebar } from "@/entities/instance/InstanceSidebar";
import { RoomDashboard } from "@/entities/room/RoomDashboard";

export default function Page() {
	return (
		<div className="p-2 w-full h-full flex flex-col items-center">
			{/* <Instance />  */}
			<RoomDashboard />
			<InstanceSidebar.room />
		</div>
	);
}
