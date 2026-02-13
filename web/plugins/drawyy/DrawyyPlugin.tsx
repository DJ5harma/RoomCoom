"use client";
import { Drawyy } from "./Drawyy";
import { ToolSelectionProvider } from "./providers/ToolSelectionProvider";
import { ToolSelector } from "./components/ToolSelector";
import { ElementsProvider } from "./providers/ElementsProvider";
import { InputManager } from "./components/InputManager";
import { ContainerProvider } from "./providers/ContainerProvider";

export const DrawyyPlugin = () => {
	return (
		<ToolSelectionProvider>
			<div className="h-full relative">
				<div className="absolute bottom-4 w-full justify-center flex z-50">
					<ToolSelector />
				</div>
				<ElementsProvider>
					<InputManager />
					<ContainerProvider>
						<Drawyy />
					</ContainerProvider>
				</ElementsProvider>
			</div>
		</ToolSelectionProvider>
	);
};
