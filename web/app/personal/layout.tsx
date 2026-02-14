"use client";

import { PluginProvider } from "@/plugins/PluginProvider";
import { ReactNode } from "react";
import { PersonalStrip } from "./PersonalStrip";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<PluginProvider instanceType="personal">
			<div className="flex flex-col w-full h-screen">
				<PersonalStrip />
				{children}
			</div>
		</PluginProvider>
	);
}
