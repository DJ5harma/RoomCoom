import { useToolSelection } from "../providers/ToolSelectionProvider";
import { CircleMaker } from "../makers/CircleMaker";
import { useUser } from "@/entities/user/UserProvider";

const now = () => Date.now();

export const InputManager = () => {
	const { selectedTool } = useToolSelection();
	const { user } = useUser();

	return (
		<div className="w-full h-full border-6 z-50 fixed top-0 left-0 border-red-400">
			<CircleMaker myKey={`${user.id}:circle:maker:${now()}`} />
		</div>
	);
};
