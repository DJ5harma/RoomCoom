import { UserBadge } from "@/components/user/UserBadge";
import { useContainerData } from "./containerData.context";
import { useRoomData } from "../context/roomData.context";
import { ToolsSidebar } from "./ToolsSidebar";
import { RenderCorrectPlugin } from "./RenderCorrectPlugin";

export const Container = () => {
	const { roomMembers } = useRoomData();
	const { container, containerMembers } = useContainerData();

	return (
		<div className="flex w-full">
			<div className="p-2">
				<p>{container.name}</p>
				<div className="flex flex-col gap-2">
					{containerMembers.map((userId) => {
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
