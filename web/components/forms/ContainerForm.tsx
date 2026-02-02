import { useGlobal } from "@/context/global.context";
import { Api } from "@/utils/Api";
import { uuid } from "@/utils/types";
import { useParams } from "next/navigation";
import { FormEvent } from "react";

export const InstanceForm = () => {
	const { setRoomMap } = useGlobal();
	const { roomId } = useParams() as { roomId: uuid };

	function createRoom(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const instanceName = data.get("instance-name");

		Api.post(`/room/${roomId}/instance/create`, {
			name: instanceName,
		}).then(({ data: { instance } }) => {
			console.log({ instance });

			setRoomMap((p) => {
				const currInstances = p[roomId].instances;
				console.log({
					...p,
					[roomId]: {
						...p[roomId],
						instances: [...currInstances, instance],
					},
				});

				return {
					...p,
					[roomId]: {
						...p[roomId],
						instances: [...currInstances, instance],
					},
				};
			});
		});
	}
	return (
		<form onSubmit={createRoom}>
			<input
				type="text"
				name="instance-name"
				className="border border-white"
			/>
			<button type="submit">Create Cointainer</button>
		</form>
	);
};
