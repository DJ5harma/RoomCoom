import { useEffect, useRef } from "react";
import { useElements } from "./providers/ElementsProvider";
import { CircleRenderer } from "./renderers/CircleRenderer";
import { CircleI } from "./types";
import { useContainer } from "./providers/ContainerProvider";

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
						default:
							break;
					}
				})}
			</svg>
		</>
	);
};
