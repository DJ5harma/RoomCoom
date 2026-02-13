import { useToolSelection } from "../providers/ToolSelectionProvider";
import { CircleMaker } from "../makers/CircleMaker";
import { useUser } from "@/entities/user/UserProvider";
import { RectangleMaker } from "../makers/RectangleMaker";
import { LineMaker } from "../makers/LineMaker";

const now = () => Date.now();

export const InputManager = () => {
	return (
		<div className="w-full h-full z-10 fixed top-0 left-0">
			<CorrectMaker />
		</div>
	);
};

const CorrectMaker = () => {
	const { user } = useUser();
	const { selectedTool } = useToolSelection();

	const myKey = `${user.id}:${selectedTool}:maker:${now()}`;

	switch (selectedTool) {
		case "Circle":
			return <CircleMaker myKey={myKey} />;
		case "Rectangle":
			return <RectangleMaker myKey={myKey} />;
		case "Line":
			return <LineMaker myKey={myKey} />;
		default:
			return <></>;
	}
};
