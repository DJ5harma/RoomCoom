import { UserBadge } from "@/components/user/UserBadge";
import { useInstance } from "./InstanceProvider";
import { useRoom } from "../room/RoomProvider";
import { RenderCorrectPlugin } from "./RenderCorrectPlugin";

export const Instance = () => {
	const { members } = useRoom();
	const { instance, instanceMembers } = useInstance();

	return (
		<div className="flex w-full">
			<div className="p-2">
				<p>{instance.name}</p>
				<div className="flex flex-col gap-2">
					{instanceMembers.map((userId) => {
						const user = members[userId];
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
