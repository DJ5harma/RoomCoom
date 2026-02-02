import { useGlobal } from "@/context/GlobalProvider";
import { Api } from "@/utils/Api";
import { FormEvent } from "react";

export const RoomForm = () => {
	const { setRoomMap } = useGlobal();
	function createRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const roomName = data.get("room-name");

		Api.post("/room/create", { name: roomName }).then(({ data: { room } }) => {
			setRoomMap((p) => ({ ...p, [room.id]: { room, instances: [] } }));
			console.log({ room });
		});
	}
	return (
		<form onSubmit={createRoom}>
			<input type="text" name="room-name" className="border border-white" />
			<button type="submit">Create ROom</button>
		</form>
	);
};
