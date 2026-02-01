"use client";
import { ReactNode } from "react";
import { RoomDataProvider } from "../../context/roomData.context";
import { useParams } from "next/navigation";
import { uuid } from "@/app/types";

export default function Layout({ children }: { children: ReactNode }) {
	const { roomId } = useParams() as { roomId: uuid };
	return (
		<>
			<RoomDataProvider roomId={roomId}>{children}</RoomDataProvider>
		</>
	);
}
