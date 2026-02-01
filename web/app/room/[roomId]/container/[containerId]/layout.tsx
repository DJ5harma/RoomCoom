"use client";
import { ReactNode } from "react";
import { ContainerDataProvider } from "./context/containerData.context";
import { useParams } from "next/navigation";
import { uuid } from "@/app/types";
import { Container } from "./components/Container";

export default function Layout({ children }: { children: ReactNode }) {
	const { roomId, containerId } = useParams() as {
		roomId: uuid;
		containerId: uuid;
	};
	return (
		<ContainerDataProvider roomId={roomId} containerId={containerId}>
			<Container>{children}</Container>
		</ContainerDataProvider>
	);
}
