"use client";
import { Drawyy } from "./Drawyy";
import { ToolSelectionProvider } from "./providers/ToolSelectionProvider";
import { ToolSelector } from "./components/ToolSelector";
import { ElementsProvider } from "./providers/ElementsProvider";
import { InputManager } from "./components/InputManager";
import { ContainerProvider } from "./providers/ContainerProvider";
import { NodesProvider } from "./providers/NodesProvider";
import { PalleteProvider } from "./providers/PalleteProvider";
import { PalleteSelector } from "./components/PalleteSelector";

export const DrawyyPlugin = () => {
	return (
		<PalleteProvider>
			<ElementsProvider>
				<ToolSelectionProvider>
					<div className="h-full relative">
						<ContainerProvider>
							<NodesProvider>
								<InputManager />

								<Drawyy />
							</NodesProvider>
						</ContainerProvider>
						<div className="absolute bottom-2 left-2 z-50 select-none flex items-end gap-2 h-fit">
							<PalleteSelector />
						</div>
						<div className="absolute bottom-2 left-50 z-50 select-none flex items-end gap-2 h-fit">
							<ToolSelector />
						</div>
					</div>
				</ToolSelectionProvider>
			</ElementsProvider>
		</PalleteProvider>
	);
};
