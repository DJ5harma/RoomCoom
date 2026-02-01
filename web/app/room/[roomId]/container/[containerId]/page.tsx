"use client";
import { useContainerData } from "./context/containerData.context";

export default function Page() {
	const { container } = useContainerData();
	return <div>CONTAINER: {JSON.stringify(container)}</div>;
}
