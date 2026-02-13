import { useElements } from "./providers/ElementsProvider";
import { CircleRenderer } from "./renderers/CircleRenderer";
import { CircleI, LineI, PencilI, RectangleI } from "./types";
import { useContainer } from "./providers/ContainerProvider";
import { RectangleRenderer } from "./renderers/RectangleRenderer";
import { LineRenderer } from "./renderers/LineRenderer";
import { PencilRenderer } from "./renderers/PencilRenderer";

export const Drawyy = () => {
	const { elements } = useElements();
	const { containerRef, offset } = useContainer();

	const elementEntries = Object.entries(elements)

	return (
		<svg className="border w-full h-full relative" ref={containerRef}>
			<g transform={`translate(${offset[0]} ${offset[1]})`}>
				{elementEntries.map(([key, { element }]) => {
					if(!element) return <div key={key} />
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
						case "pencil":
							return <PencilRenderer key={key} pencil={element as PencilI} />;
					}
				})}
			</g>
		</svg>
	);
};
