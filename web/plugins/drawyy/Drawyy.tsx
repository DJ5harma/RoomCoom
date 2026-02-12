import { Circle, Layer, Stage } from "react-konva";
import { useContainer } from "./providers/ContainerProvider";
import { useElements } from "./providers/ElementsProvider";
import { CircleI } from "./types";

export const Drawyy = () => {
	const { containerSize } = useContainer();

	const { elements } = useElements();

	return (
		<Stage width={containerSize.width} height={containerSize.height} className="absolute inset-0">
			<Layer>
				{Object.entries(elements).map(([key, { element }]) => {
					switch (element.name) {
						case "circle":
							const circle = element as CircleI;
							return (
								<Circle
									key={key}
									radius={circle.radius}
									fill="red"
									x={circle.position.x}
									y={circle.position.y}
								/>
							);
						default:
							break;
					}
				})}
			</Layer>
		</Stage>
	);
};
