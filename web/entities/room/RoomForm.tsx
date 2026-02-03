import { Api } from "@/utils/Api";
import { FormEvent } from "react";
import { useUser } from "../user/UserProvider";

export const RoomForm = () => {
	const { addRoom } = useUser();

	function createRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const roomName = data.get("room-name");

		Api.post("/room/create", { name: roomName }).then(({ data: { room } }) => {
			addRoom(room);
		});
	}
	return (
		<form onSubmit={createRoom}>
			<input type="text" name="room-name" className="border border-white" />
			<button type="submit">Create ROom</button>
		</form>
	);
};
