import { useRoom } from "@/app/room/context/room.context";
import { Api } from "@/utils/Api";
import { FormEvent } from "react";

export const GroupForm = () => {
	const { room, setGroups, setMembers } = useRoom();

	function handleCreateGroup(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const groupName = formData.get("groupName");

		Api.post(`/manager/room/${room.id}/create-group`, {
			groupName,
		}).then(({ data: { group, member } }) => {
			setGroups((p) => [...p, group]);
			setMembers((p) => [...p, member]);
		});
	}
	return (
		<form onSubmit={handleCreateGroup} className="p-6 bg-black flex flex-col gap-4">
			<h3>Create a group for room {room.name}</h3>
			<input type="text" name="groupName" placeholder="Group Name" className="border-red-400 border" />
			<button type="submit" className="border border-red-400">Create</button>
		</form>
	);
};
