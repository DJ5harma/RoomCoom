"use client";
import { PluginDashboard } from "@/plugins/PluginDashboard";
import { ClubsBar } from "./ClubsBar";

export default function Page() {
	return (
		<div className="h-full flex">
			<ClubsBar />
			<PluginDashboard />;
		</div>
	);
}
