import { BiCircle, BiEraser, BiRectangle } from "react-icons/bi";
import { ToolType } from "../types";
import { useToolSelection } from "../providers/ToolSelectionProvider";
import { PiPencil } from "react-icons/pi";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { FaHand } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import { useElements } from "../providers/ElementsProvider";

export const ToolSelector = () => {
	const tools: ToolType[] = [
		{
			name: "Pan",
			icon: <FaHand size={24} />,
		},
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
			icon: <TfiLayoutLineSolid size={24} />,
		},
		{
			name: "Pencil",
			icon: <PiPencil size={24} />,
		},
		{
			name: "Eraser",
			icon: <BiEraser size={24} />,
		},
	];
	const dustbin = {
		name: "Dustbin",
		icon: <MdDeleteSweep size={24} />,
	};
	const { selectedTool, setSelectedTool } = useToolSelection();
	const { deleteAllElements } = useElements();

	return (
		<div className="rounded-lg flex items-center gap-0.5 px-1.5 py-1 bg-white border-2 border-purple-800 h-fit">
			{tools.map(({ icon, name }) => {
				const isSelected = selectedTool === name;
				return (
					<div
						onClick={(e) => {
							e.stopPropagation();
							setSelectedTool(name);
						}}
						key={name}
						className={`p-1 ${isSelected ? "bg-green-600" : "bg-gray-800"} border rounded-lg`}
						title={name}
					>
						{icon}
					</div>
				);
			})}
			<div
				onClick={(e) => {
					e.stopPropagation();
					deleteAllElements();
				}}
				className={`p-1 ${"bg-gray-800"} border rounded-lg`}
			>
				{dustbin.icon}
			</div>
		</div>
	);
};
