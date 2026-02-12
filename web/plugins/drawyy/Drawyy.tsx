import { Circle, Layer, Stage } from "react-konva";
import { useContainer } from "./providers/ContainerProvider";
import { useElements } from "./providers/ElementsProvider";
import { CircleI } from "./types";

export const Drawyy = () => {
	const { containerSize } = useContainer();

	const { elements } = useElements();

	return (
		<Stage width={containerSize.width} height={containerSize.height}>
			<Layer>
				<Circle radius={50} fill="red" x={100} y={100} draggable />
				{Object.entries(elements).map(([k, { element }]) => {
					switch (element.name) {
						case "circle":
							const circle = element as CircleI;
							<Circle
								radius={circle.radius}
								fill="red"
								x={circle.position.x}
								y={circle.position.y}
								draggable
							/>;

							break;

						default:
							break;
					}
				})}
			</Layer>
		</Stage>
	);
};
