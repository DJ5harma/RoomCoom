import { useElements } from "./providers/ElementsProvider";
import { CircleRenderer } from "./renderers/CircleRenderer";
import { CircleI, LineI, RectangleI } from "./types";
import { useContainer } from "./providers/ContainerProvider";
import { RectangleRenderer } from "./renderers/RectangleRenderer";
import { LineRenderer } from "./renderers/LineRenderer";

export const Drawyy = () => {
	const { elements } = useElements();
	const { containerRef } = useContainer();
	return (
		<>
			<svg className="border w-full h-full relative" ref={containerRef}>
				{Object.entries(elements).map(([key, { element }]) => {
					switch (element.name) {
						case "circle":
							return <CircleRenderer key={key} circle={element as CircleI} />;
						case "rectangle":
							return (
								<RectangleRenderer
									key={key}
									rectangle={element as RectangleI}
								/>
							);
						case "line":
							return <LineRenderer key={key} line={element as LineI} />;
						default:
							break;
					}
				})}
			</svg>
		</>
	);
};
