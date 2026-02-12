"use client";
import { ContainerProvider } from "./providers/ContainerProvider";
import { Drawyy } from "./Drawyy";

export const DrawyyPlugin = () => {
	return (
		<ContainerProvider>
			<Drawyy />
		</ContainerProvider>
	);
};
