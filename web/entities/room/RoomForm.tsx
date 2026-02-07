import { Api } from "@/utils/Api";
import { FormEvent, useState } from "react";
import { useUser } from "../user/UserProvider";
import { UserSearch } from "../user/UserSearch";
import { UserI } from "@/utils/types";
import { useModal } from "@/components/ModalWrapper";

export const RoomForm = () => {
	const { addRoom } = useUser();
	const {close} = useModal()

	const [chosenMembers, setChosenMembers] = useState<UserI[]>([]);

	function handleMemberSelection(members: UserI[]) {
		setChosenMembers(members);
	}

	function createRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const roomName = data.get("room-name");
		const members = chosenMembers.map(({ id }) => ({ user: id }));

		Api.post("/room", { name: roomName, members }).then(
			({ data: { room } }) => {
				addRoom(room);
				close();
			},
		);
	}
	return (
		<form onSubmit={createRoom} className="flex flex-col gap-4">
			<p>Create a new room:</p>
			<input type="text" name="room-name" className="border border-white" />

			<p>Add members:</p>
			<div>
				<UserSearch onSelected={handleMemberSelection} />
			</div>
			<button type="submit">Create Room</button>
		</form>
	);
};
