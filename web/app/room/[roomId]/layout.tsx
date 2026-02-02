"use client";
import { ReactNode } from "react";
import { RoomProvider } from "@/entities/room/RoomProvider";
import { useParams } from "next/navigation";
import { uuid } from "@/utils/types";

export default function Layout({ children }: { children: ReactNode }) {
	const { roomId } = useParams() as { roomId: uuid };
	return <RoomProvider roomId={roomId}>{children}</RoomProvider>;
}
