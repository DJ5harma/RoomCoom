import { useRoom } from "../../context/room.context";
import { GroupBadge } from "./GroupBadge";

export const RoomLeftbar = () => {
	const { room, groups, members, distinctUsers } = useRoom();

	function getMembersInGroup(groupId: string) {
		return members.filter((member) => member.groupId === groupId);
	}

	return (
		<aside className="border flex flex-col p-4 gap-4">
			<h1 className="text-lg bg-violet-800 p-2">Room: {room.name}</h1>
			<div className="flex flex-col gap-4">
				<h4>___GROUPS___</h4>
				{groups.map((group) => {
					return <GroupBadge key={group.id} group={group} />;
				})}
			</div>
		</aside>
	);
};
