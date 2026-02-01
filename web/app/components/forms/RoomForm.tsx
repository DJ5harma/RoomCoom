import { useRooms } from "@/app/context/rooms.context";
import { Api } from "@/utils/Api";
import { FormEvent } from "react";

export const RoomForm = () => {
	const { setRooms } = useRooms();
	function createRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const roomName = data.get("room-name");

		Api.post("/room/create", { name: roomName }).then(({ data }) => {
			setRooms((p) => [...p, data.room]);
			console.log({ data });
		});
	}
	return (
		<form onSubmit={createRoom}>
			<input type="text" name="room-name" className="border border-white" />
			<button type="submit">Create ROom</button>
		</form>
	);
};
