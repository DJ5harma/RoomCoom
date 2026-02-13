"use client";
import { ContainerProvider } from "./providers/ContainerProvider";
import { Drawyy } from "./Drawyy";
import { ToolSelectionProvider } from "./providers/ToolSelectionProvider";
import { ToolSelector } from "./components/ToolSelector";
import { ElementsProvider } from "./providers/ElementsProvider";
import { InputManager } from "./components/InputManager";

export const DrawyyPlugin = () => {
	return (
		<ContainerProvider>
			<ToolSelectionProvider>
				<div className="fixed bottom-4 justify-center flex">
					<ToolSelector />
				</div>
				<ElementsProvider>
					<InputManager />
					<Drawyy />
				</ElementsProvider>
			</ToolSelectionProvider>
		</ContainerProvider>
	);
};
