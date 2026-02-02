import { useGlobal } from "@/context/global.context";
import { Api } from "@/utils/Api";
import { uuid } from "@/utils/types";
import { useParams } from "next/navigation";
import { FormEvent } from "react";

export const ContainerForm = () => {
	const { setRoomMap } = useGlobal();
	const { roomId } = useParams() as { roomId: uuid };

	function createRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const containerName = data.get("container-name");

		Api.post(`/room/${roomId}/container/create`, {
			name: containerName,
		}).then(({ data: { container } }) => {
			console.log({ container });

			setRoomMap((p) => {
				const currContainers = p[roomId].containers;
				console.log({
					...p,
					[roomId]: {
						...p[roomId],
						containers: [...currContainers, container],
					},
				});

				return {
					...p,
					[roomId]: {
						...p[roomId],
						containers: [...currContainers, container],
					},
				};
			});
		});
	}
	return (
		<form onSubmit={createRoom}>
			<input
				type="text"
				name="container-name"
				className="border border-white"
			/>
			<button type="submit">Create Cointainer</button>
		</form>
	);
};
