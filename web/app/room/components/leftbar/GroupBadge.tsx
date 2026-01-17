import { Group, useRoom } from "../../context/room.context";
import Link from "next/link";
import { useParams } from "next/navigation";

export const GroupBadge = ({ group }: { group: Group }) => {
	const { groupId: activeGroupId } = useParams();
	const { room } = useRoom();

	const isActive = group.id === activeGroupId;
	return (
		<Link
			href={`/room/${room.id}/group/${group.id}`}
			className={`${isActive ? "text-black bg-green-500" : "bg-black text-green-500 border-green-500"}  border flex p-2`}
		>
			<p>{group.name}</p>
		</Link>
	);
};
