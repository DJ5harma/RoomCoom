import { Api } from "@/utils/Api";
import { FormEvent } from "react";
import { useRoom } from "../room/RoomProvider";

export const InstanceForm = () => {
	const { room, addInstance } = useRoom();

	function createRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const instanceName = data.get("instance-name");

		Api.post(`/instance/create`, {
			name: instanceName,
			roomId: room.id,
		}).then(({ data: { instance } }) => {
			addInstance(instance);
		});
	}
	return (
		<form onSubmit={createRoom}>
			<input type="text" name="instance-name" className="border border-white" />
			<button type="submit">Create Cointainer</button>
		</form>
	);
};
