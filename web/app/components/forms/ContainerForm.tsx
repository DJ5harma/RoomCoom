import { useRoomData } from "@/app/room/[roomId]/context/roomData.context";
import { Api } from "@/utils/Api";
import { FormEvent } from "react";

export const ContainerForm = () => {
	const { room, setContainers } = useRoomData();

	const roomId = room.id;

	function createRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const containerName = data.get("container-name");

		Api.post(`/room/${roomId}/container/create`, {
			name: containerName,
		}).then(({ data: { container } }) => {
			setContainers(p => [...p, container]);
		});
	}
	return (
		<form onSubmit={createRoom}>
			<input type="text" name="container-name" className="border border-white" />
			<button type="submit">Create Cointainer</button>
		</form>
	);
};
