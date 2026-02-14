"use client";

import { PluginProvider } from "@/plugins/PluginProvider";
import { SpaceProvider } from "@/entities/space/SpaceProvider";
import { uuid } from "@/utils/types";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { DirectStrip } from "./DirectStrip";

export default function Layout({ children }: { children: ReactNode }) {
	const { spaceId } = useParams() as { spaceId: uuid };

	return (
		<SpaceProvider spaceId={spaceId}>
			<PluginProvider instanceType="direct">
				<div className="flex flex-col w-full h-screen">
					<DirectStrip />
					{children}
				</div>
			</PluginProvider>
		</SpaceProvider>
	);
}
