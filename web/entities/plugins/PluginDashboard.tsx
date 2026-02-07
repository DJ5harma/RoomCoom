"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { PluginSidebar } from "./PluginSidebar";
import { PLUGIN_MAP } from "./PLUGIN_MAP";

export const PluginDashboard = () => {
	const searchParams = useSearchParams();
	const active = searchParams.get("plugin") ?? "defaultyy";

	const [mounted, setMounted] = useState(() => new Set(["defaultyy"]));

	if (!mounted.has(active)) {
		setMounted((prev) => new Set(prev).add(active));
	}

	return (
		<div className="w-full flex justify-between h-screen">
			<div className="flex-1 h-full">
				{Object.entries(PLUGIN_MAP).map(([name, Comp]) =>
					mounted.has(name) ? (
						<div
							key={name}
							className={active === name ? "block h-full" : "hidden"}
						>
							<Comp.node />
						</div>
					) : null,
				)}
			</div>

			<PluginSidebar activePlugin={active} />
		</div>
	);
};
