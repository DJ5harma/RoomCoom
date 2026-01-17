"use client";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { RoomProvider } from "../context/room.context";

export default function Layout({ children }: { children: ReactNode }) {
	const { roomId } = useParams() as { roomId: string };
	return <RoomProvider roomId={roomId}>{children}</RoomProvider>;
}
