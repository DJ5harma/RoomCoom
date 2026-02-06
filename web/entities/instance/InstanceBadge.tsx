import { InstanceI } from "@/utils/types";
import { useInstanceMemory } from "./InstanceMemory";
import { InstanceProvider } from "./InstanceProvider";

export const InstanceBadge = ({ instance }: { instance: InstanceI }) => {
	const { activateInstance } = useInstanceMemory();
	return (
		<div
			className="bg-white text-black p-2 rounded-xl cursor-pointer"
			onClick={() => {
				activateInstance(instance, <InstanceProvider instance={instance} />);
			}}
		>
			<div className="flex items-center flex-col">
				<p className="text-md">{instance.name}</p>
				<p className="text-sm text-gray-400">{instance.plugin.name}</p>
			</div>
		</div>
	);
};
