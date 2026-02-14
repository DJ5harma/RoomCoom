"use client";
import { Drawyy } from "./Drawyy";
import { ToolSelectionProvider } from "./providers/ToolSelectionProvider";
import { ToolSelector } from "./components/ToolSelector";
import { ElementsProvider } from "./providers/ElementsProvider";
import { InputManager } from "./components/InputManager";
import { ContainerProvider } from "./providers/ContainerProvider";
import { NodesProvider } from "./providers/NodesProvider";

export const DrawyyPlugin = () => {
	return (
		<ElementsProvider>
			<ToolSelectionProvider>
				<div className="h-full relative">
					<ContainerProvider>
						<NodesProvider>
							<InputManager />

							<Drawyy />
						</NodesProvider>
					</ContainerProvider>
					<div className="absolute bottom-4 w-full justify-center flex z-50">
						<ToolSelector />
					</div>
				</div>
			</ToolSelectionProvider>
		</ElementsProvider>
	);
};
