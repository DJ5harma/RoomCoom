import { UserBadge } from "@/components/user/UserBadge";
import { useInstance } from "./InstanceProvider";
import { useRoomData } from "../context/roomData.context";
import { RenderCorrectPlugin } from "./RenderCorrectPlugin";

export const Instance = () => {
	const { roomMembers } = useRoomData();
	const { instance, instanceMembers } = useInstance();

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
		</div>
	);
};
