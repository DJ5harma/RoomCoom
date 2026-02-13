import { useContainer } from "./providers/ContainerProvider";
import { useElements } from "./providers/ElementsProvider";
import { CircleRenderer } from "./renderers/CircleRenderer";
import { CircleI } from "./types";

export const Drawyy = () => {
	const { containerSize } = useContainer();

	const { elements } = useElements();

	return (
		<>
			<svg className="border w-full h-full">
				{Object.entries(elements).map(([key, { element }]) => {
					switch (element.name) {
						case "circle":
							return <CircleRenderer key={key} circle={element as CircleI} />;
						default:
							break;
					}
				})}
			</svg>
		</>
	);
};
