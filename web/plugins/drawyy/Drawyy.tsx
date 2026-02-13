import { useContainer } from "./providers/ContainerProvider";
import { useElements } from "./providers/ElementsProvider";
import { CircleI } from "./types";

export const Drawyy = () => {
	const { containerSize } = useContainer();

	const { elements } = useElements();

	return (
		<div className={`w-[${containerSize.width}]px h-[${containerSize.height}]`}>

		</div>
	);
};
