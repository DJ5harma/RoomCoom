import { Api } from "@/utils/Api";
import { FormEvent } from "react";
import { useRoom } from "../room/RoomProvider";
import { InstanceI, PluginEnum } from "@/utils/types";

export const InstanceForm = ({ type }: { type: InstanceI["type"] }) => {
	const { room, addInstance } = useRoom();

	async function createInstance(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const name = data.get("instance-name");
		const plugin = data.get("plugin");

		let newInstance: InstanceI | undefined = undefined;
		switch (type) {
			case "room":
				newInstance = (
					await Api.post(`/room/${room.id}/instance`, {
						name,
						plugin,
					})
				).data.newInstance;
				break;
			default:
				break;
		}
		if (!newInstance) return;
		addInstance(newInstance);
	}
	return (
		<form onSubmit={createInstance}>
			<input type="text" name="instance-name" className="border border-white" />
			<label htmlFor="plugin">Choose a car:</label>
			<select id="plugin" name="plugin">
				{([PluginEnum.chatyy, PluginEnum.meetyy] as PluginEnum[]).map(
					(plugin) => {
						return (
							<option key={plugin} value={plugin}>
								{plugin}
							</option>
						);
					},
				)}
			</select>
			<button type="submit">Create Cointainer</button>
		</form>
	);
};
