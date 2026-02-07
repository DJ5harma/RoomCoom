import { Api } from "@/utils/Api";
import { FormEvent, useState } from "react";
import { UserSearch } from "../user/UserSearch";
import { UserI } from "@/utils/types";
import { useModal } from "@/components/ModalWrapper";
import { useRoom } from "./RoomProvider";

export const ClubForm = () => {
	const { room } = useRoom();
	const { close } = useModal();

	const [chosenMembers, setChosenMembers] = useState<UserI[]>([]);

	function handleMemberSelection(members: UserI[]) {
		setChosenMembers(members);
	}

	function createRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const roomName = data.get("club-name");
		const memberIds = chosenMembers.map(({ id }) => id);

		Api.post(`/room/${room.id}/club`, { name: roomName, memberIds }).then(
			() => {
				close();
			},
		);
	}
	return (
		<form onSubmit={createRoom} className="flex flex-col gap-4">
			<p>Create a new club:</p>
			<input type="text" name="club-name" className="border border-white" />

			<p>Choose members from your room:</p>
			<div>
				<UserSearch
					onSelected={handleMemberSelection}
					localUsers={room.members.map(({ user }) => user)}
				/>
			</div>
			<button type="submit">Create Club</button>
		</form>
	);
};
