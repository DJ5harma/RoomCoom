import { Circle, Layer, Stage } from "react-konva";
import { useContainer } from "./providers/ContainerProvider";

export const Drawyy = () => {
	const { containerSize } = useContainer();

	return (
		<Stage width={containerSize.width} height={containerSize.height}>
			<Layer>
				<Circle radius={50} fill="red" x={100} y={100} />
			</Layer>
		</Stage>
	);
};
