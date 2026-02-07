"use client";
import { ReactNode } from "react";
import { RoomProvider } from "@/entities/room/RoomProvider";
import { useParams } from "next/navigation";
import { uuid } from "@/utils/types";
import { PluginProvider } from "@/entities/plugins/PluginProvider";
import { RoomStrip } from "./RoomStrip";

export default function Layout({ children }: { children: ReactNode }) {
	const { roomId } = useParams() as { roomId: uuid };
	return (
		<RoomProvider roomId={roomId}>
			<PluginProvider instanceType="room">
				<div className="w-full">
					<RoomStrip />
					{children}
				</div>
			</PluginProvider>
		</RoomProvider>
	);
}
