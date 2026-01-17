import { Modal } from "@/app/components/Modal";
import { useRoom } from "../../context/room.context";
import { GroupBadge } from "./GroupBadge";
import { GroupForm } from "@/app/components/forms/GroupForm";

export const RoomLeftbar = () => {
	const { room, groups } = useRoom();

	return (
		<aside className="border flex flex-col p-4 gap-4">
			<h1 className="text-lg bg-violet-800 p-2">Room: {room.name}</h1>
			<div className="flex flex-col gap-4">
				<h4>___GROUPS___</h4>
				<Modal
					ON_show={<GroupForm />}
					OFF_show={
						<button className="border-orange-300 border text-orange-300">
							Create +
						</button>
					}
				/>
				{groups.map((group) => {
					return <GroupBadge key={group.id} group={group} />;
				})}
			</div>
		</aside>
	);
};
