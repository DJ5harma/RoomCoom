"use client";

import { PluginProvider } from "@/entities/plugins/PluginProvider";
import { SpaceProvider } from "@/entities/space/SpaceProvider";
import { uuid } from "@/utils/types";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { ClubStrip } from "./ClubStrip";

export default function Layout({ children }: { children: ReactNode }) {
	const { spaceId } = useParams() as { spaceId: uuid };

	return (
		<SpaceProvider spaceId={spaceId}>
			<PluginProvider instanceType="club">
				<div className="flex flex-col w-full">

				<ClubStrip />
				{children}
				</div>
			</PluginProvider>
		</SpaceProvider>
	);
}
