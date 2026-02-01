"use client";
import { ReactNode } from "react";
import { ChatyyProvider } from "./chatyy.context";
import { useParams } from "next/navigation";
import { uuid } from "@/app/types";

export default function Layout({ children }: { children: ReactNode }) {
	const { roomId, containerId } = useParams() as {
		roomId: uuid;
		containerId: uuid;
	};
	return (
		<ChatyyProvider containerId={containerId!} roomId={roomId!}>
			{children}
		</ChatyyProvider>
	);
}
