import { UserBadge } from "@/components/user/UserBadge";
import { useInstanceData } from "./instanceData.context";
import { useRoomData } from "../context/roomData.context";
import { ToolsSidebar } from "./ToolsSidebar";
import { RenderCorrectPlugin } from "./RenderCorrectPlugin";

export const Instance = () => {
	const { roomMembers } = useRoomData();
	const { instance, instanceMembers } = useInstanceData();

	return (
		<div className="flex w-full">
			<div className="p-2">
				<p>{instance.name}</p>
				<div className="flex flex-col gap-2">
					{instanceMembers.map((userId) => {
						const user = roomMembers[userId];
						return (
							<div key={user.id}>
								<UserBadge user={user} />
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex-1">
				<RenderCorrectPlugin />
			</div>
			<div>
				<ToolsSidebar />
			</div>
		</div>
	);
};
