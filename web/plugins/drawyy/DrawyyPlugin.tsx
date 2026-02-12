"use client";
import { ContainerProvider } from "./providers/ContainerProvider";
import { Drawyy } from "./Drawyy";
import { ToolSelectionProvider } from "./providers/ToolSelectionProvider";
import { ToolSelector } from "./components/ToolSelector";

export const DrawyyPlugin = () => {
	return (
		<ContainerProvider>
			<ToolSelectionProvider>
				<div className="absolute bottom-4 w-full justify-center flex z-50">
					<ToolSelector />
				</div>
				<Drawyy />
			</ToolSelectionProvider>
		</ContainerProvider>
	);
};
