import { Api } from "@/utils/Api";
import { FormEvent } from "react";
import { useRoom } from "../room/RoomProvider";
import { InstanceI, PluginEnum } from "@/utils/types";

export const InstanceForm = ({ type }: { type: InstanceI["type"] }) => {
	switch (type) {
		case "room":
			return <RoomInstanceForm type="room" />;
		case "space":
			return <RoomInstanceForm type="space" />;
		case "direct":
			return <NonRoomInstanceForm type="direct" />;
		case "user":
		default:
			return <NonRoomInstanceForm type="user" />;
	}
};

export const RoomInstanceForm = ({ type }: { type: InstanceI["type"] }) => {
	const { room, addInstance } = useRoom();

	async function createInstance(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const name = data.get("instance-name");
		const plugin = data.get("plugin");

		let newInstance: InstanceI | undefined = undefined;
		switch (type) {
			case "room":
			case "space":
				newInstance = (
					await Api.post(`/room/${room.id}/instance`, {
						name,
						plugin,
						type,
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
			<h2>Create {type} plugin</h2>
			<input type="text" name="instance-name" className="border border-white" placeholder="name" />
			<label htmlFor="plugin">Choose a Plugin:</label>
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
export const NonRoomInstanceForm = ({ type }: { type: InstanceI["type"] }) => {
	async function createInstance(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const name = data.get("instance-name");
		const plugin = data.get("plugin");

		// let newInstance: InstanceI | undefined = undefined;
		// switch (type) {
		// 	default:
		// 		break;
		// }
		// if (!newInstance) return;
		// addInstance(newInstance);
	}
	return (
		<form onSubmit={createInstance} className="flex flex-col p-4 gap-4">
			<h2>Create {type} plugin</h2>
			<input type="text" name="instance-name" className="border border-white" placeholder="name" />
			<label htmlFor="plugin">Choose a Plugin:</label>
			<select id="plugin" name="plugin">
				{([PluginEnum.chatyy, PluginEnum.meetyy] as PluginEnum[]).map(
					(plugin) => {
						return (
							<option className="text-black" key={plugin} value={plugin}>
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
