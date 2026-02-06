import { InstanceI } from "@/utils/types";
import { useInstanceMemory } from "./InstanceMemory";
import { InstanceProvider } from "./InstanceProvider";

export const InstanceBadge = ({ instance }: { instance: InstanceI }) => {
	const { activateInstance } = useInstanceMemory();
	return (
		<div
			className="bg-white text-black rounded-xl cursor-pointer w-full p-2 flex items-center justify-between gap-2"
			onClick={() => {
				activateInstance(instance, <InstanceProvider instance={instance} />);
			}}
		>
			<p className="text-md">{instance.name}</p>
			<p className="text-xs bg-black text-white p-1 rounded-full">{instance.plugin.name}</p>
		</div>
	);
};
