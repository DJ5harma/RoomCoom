"use client";

import { PluginProvider } from "@/entities/plugins/PluginProvider";
import { SpaceProvider } from "@/entities/space/SpaceProvider";
import { uuid } from "@/utils/types";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
	const { spaceId } = useParams() as { spaceId: uuid };

	return (
		<SpaceProvider spaceId={spaceId}>
			<PluginProvider instanceType="direct">{children}</PluginProvider>
		</SpaceProvider>
	);
}
