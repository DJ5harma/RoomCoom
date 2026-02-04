import { Api } from "@/utils/Api";
import { FormEvent } from "react";
import { useRoom } from "../room/RoomProvider";
import { InstanceI, PluginI } from "@/utils/types";
import { useFetchPlugins } from "../plugins/useFetchPlugins";

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

	const { plugins } = useFetchPlugins();

	async function createInstance(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const name = data.get("instance-name");
		const pluginId = data.get("pluginId");

		let newInstance: InstanceI | undefined = undefined;
		switch (type) {
			case "room":
			case "space":
				newInstance = (
					await Api.post(`/room/${room.id}/instance`, {
						name,
						pluginId,
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
			<PluginSelector plugins={plugins} />
			<button type="submit">Create Cointainer</button>
		</form>
	);
};
export const NonRoomInstanceForm = ({ type }: { type: InstanceI["type"] }) => {
	const { plugins } = useFetchPlugins();
	async function createInstance(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const name = data.get("instance-name");
		const pluginId = data.get("pluginId");

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
			<PluginSelector plugins={plugins} />

			<button type="submit">Create Cointainer</button>
		</form>
	);
};

const PluginSelector = ({ plugins }: { plugins: PluginI[] }) => {
	return (
		<>
			<input
				type="text"
				name="instance-name"
				className="border border-white"
				placeholder="name"
			/>
			<label htmlFor="pluginId">Choose a Plugin:</label>
			<select id="pluginId" name="pluginId">
				{plugins.map((plugin) => {
					return (
						<option className="text-black" key={plugin.id} value={plugin.id}>
							{plugin.name}
						</option>
					);
				})}
			</select>
		</>
	);
};
