"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ChatyyPlugin } from "./chatyy/ChatyyPlugin";
import { MeetyyPlugin } from "./meetyy/MeetyyPlugin";
import Link from "next/link";
import { DefaultyyPlugin } from "./_defaultyy/DefaultyyPlugin";

export const PluginDashboard = () => {
	const searchParams = useSearchParams();
	const plugin = searchParams.get("plugin") ?? "NULL";

	const Node = { chatyy: <ChatyyPlugin />, meetyy: <MeetyyPlugin /> }[
		plugin
	] ?? <DefaultyyPlugin />;

	return (
		<div className="w-full flex justify-between">
			{Node}
			<PluginSidebar />
		</div>
	);
};

const PluginSidebar = () => {
	const pathname = usePathname();
	return (
		<aside className="flex flex-col gap-2">
			{["defaultyy", "chatyy", "meetyy"].map((plugin) => {
				return (
					<Link
						className="p-2 bg-white text-black"
						href={pathname + "?plugin=" + plugin}
						key={plugin}
					>
						{plugin}
					</Link>
				);
			})}
		</aside>
	);
};
