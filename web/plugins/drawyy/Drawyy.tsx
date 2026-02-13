import { useElements } from "./providers/ElementsProvider";
import { CircleRenderer } from "./renderers/CircleRenderer";
import { CircleI } from "./types";

export const Drawyy = () => {
	const { elements } = useElements();

	return (
		<>
			<svg className="border w-full h-full relative">
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
