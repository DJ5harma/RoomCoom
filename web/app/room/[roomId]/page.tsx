"use client";
import { PluginDashboard } from "@/entities/plugins/PluginDashboard";
import { RoomStrip } from "./RoomStrip";
import { ClubsBar } from "./ClubsBar";

export default function Page() {
	return (
		<div className="w-full flex flex-col">
			<RoomStrip />
			<div className="h-full flex">
				<ClubsBar />
				<PluginDashboard />;
			</div>
		</div>
	);
}
