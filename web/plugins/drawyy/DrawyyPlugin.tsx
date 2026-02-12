"use client";
import { ContainerProvider } from "./providers/ContainerProvider";
import { Drawyy } from "./Drawyy";
import { ToolSelectionProvider } from "./providers/ToolSelectionProvider";
import { ToolSelector } from "./components/ToolSelector";
import { ElementsProvider } from "./providers/ElementsProvider";
import { InputManager } from "./components/InputManager";

export const DrawyyPlugin = () => {
	return (
		<ToolSelectionProvider>
			<ContainerProvider>
				<div className="absolute bottom-4 w-full justify-center flex z-50">
					<ToolSelector />
				</div>
				<ElementsProvider>
					<InputManager />
					<Drawyy />
				</ElementsProvider>
			</ContainerProvider>
		</ToolSelectionProvider>
	);
};
