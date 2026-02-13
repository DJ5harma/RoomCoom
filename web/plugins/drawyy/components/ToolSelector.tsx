import { BiCircle, BiRectangle } from "react-icons/bi";
import { ToolType } from "../types";
import { useToolSelection } from "../providers/ToolSelectionProvider";
import { PiPencil } from "react-icons/pi";
import { LiaLine } from "react-icons/lia";

export const ToolSelector = () => {
	const tools: ToolType[] = [
		{
			name: "Circle",
			icon: <BiCircle size={24} />,
		},
		{
			name: "Rectangle",
			icon: <BiRectangle size={24} />,
		},
		{
			name: "Line",
			icon: <LiaLine size={24} />,
		},
		{
			name: "Pencil",
			icon: <PiPencil size={24} />,
		},
	];
	const { selectedTool, setSelectedTool } = useToolSelection();


	return (
		<div className="rounded-lg flex items-center gap-0.5 px-1.5 py-1 bg-white mx-auto">
			{tools.map(({ icon, name }) => {
                const isSelected = selectedTool === name;
				return (
					<div
						onClick={(e) => {
							e.stopPropagation()
							setSelectedTool(name);
						}}
						key={name}
                        className={`p-1 ${isSelected ? "bg-green-600":"bg-gray-800"} border rounded-lg`}
					>
						{icon}
					</div>
				);
			})}
		</div>
	);
};
