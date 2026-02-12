import React from "react";
import { useToolSelection } from "../providers/ToolSelectionProvider";
import { CircleMaker } from "../makers/CircleMaker";

export const InputManager = () => {
	const { selectedTool } = useToolSelection();

	// switch (selectedTool) {
	// 	case "Circle":
	// 		return <CircleMaker myKey={45} />
	// 	case "Rectangle":
	// 		break;
	// 	case "Pencil":
	// 		break;

	// 	default:
	// 		break;
	// }
	// return <div className="">InputManager</div>;

	return (
		<div className="w-full h-full border z-50 absolute top-0">
			<CircleMaker myKey={45} />
		</div>
	);
};
