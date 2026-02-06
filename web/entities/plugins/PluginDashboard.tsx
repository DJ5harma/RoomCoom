"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ChatyyPlugin } from "./chatyy/ChatyyPlugin";
import { MeetyyPlugin } from "./meetyy/MeetyyPlugin";
import { DefaultyyPlugin } from "./_defaultyy/DefaultyyPlugin";
import Link from "next/link";

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

			<PluginSidebar />
		</div>
	);
};

const PluginSidebar = () => {
	const pathname = usePathname();

	return (
		<aside className="flex flex-col gap-2">
			{["defaultyy", "chatyy", "meetyy"].map((plugin) => (
				<Link
					className="p-2 bg-white text-black"
					href={`${pathname}?plugin=${plugin}`}
					key={plugin}
				>
					{plugin}
				</Link>
			))}
		</aside>
	);
};
