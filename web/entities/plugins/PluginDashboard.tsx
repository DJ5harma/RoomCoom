"use client";
import { useSearchParams } from "next/navigation";
import { ChatyyPlugin } from "./chatyy/ChatyyPlugin";
import { MeetyyPlugin } from "./meetyy/MeetyyPlugin";
import { DefaultyyPlugin } from "./_defaultyy/DefaultyyPlugin";
import { PluginSidebar } from "./PluginSidebar";

export const PluginDashboard = () => {
	const searchParams = useSearchParams();
	const active = searchParams.get("plugin") ?? "defaultyy";

	const arr = [
		{ name: "defaultyy", node: <DefaultyyPlugin /> },
		{ name: "chatyy", node: <ChatyyPlugin /> },
		{ name: "meetyy", node: <MeetyyPlugin /> },
	];

	return (
		<div className="w-full flex justify-between h-screen">
			<div className="flex-1 h-full">
				{arr.map(({ name, node }, i) => {
					return (
						<div
							key={i}
							className={"h-full " + (active === name ? "block" : "hidden")}
						>
							{node}
						</div>
					);
				})}
			</div>

			<PluginSidebar activePlugin={active} />
		</div>
	);
};
