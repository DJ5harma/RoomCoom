import { useToolSelection } from "../providers/ToolSelectionProvider";
import { CircleMaker } from "../makers/CircleMaker";
import { RectangleMaker } from "../makers/RectangleMaker";
import { LineMaker } from "../makers/LineMaker";
import { PencilMaker } from "../makers/PencilMaker";
import { PannerTool } from "../tools/PannerTool";
import { EraserTool } from "../tools/EraserTool";

export const InputManager = () => {
	return (
		<div className="w-full h-full z-10 absolute top-0 left-0">
			<CorrectMaker />
		</div>
	);
};

const CorrectMaker = () => {
	const { selectedTool } = useToolSelection();

	switch (selectedTool) {
		case "Circle":
			return <CircleMaker />;
		case "Rectangle":
			return <RectangleMaker />;
		case "Line":
			return <LineMaker />;
		case "Pencil":
			return <PencilMaker />;
		case "Pan":
			return <PannerTool />;
		case "Eraser":
			return <EraserTool />;
		default:
			return <></>;
	}
};
