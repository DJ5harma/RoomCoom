import { Api } from "@/utils/Api";
import { FormEvent } from "react";
import { InstanceI, InstanceType, uuid } from "@/utils/types";
import { useFetchPlugins } from "../plugins/useFetchPlugins";

type FormBody = {
	name: string;
	type: InstanceType;
	pluginId: uuid;
	roomId?: uuid;
	space_memberIds?: uuid[];
	direct_peerId?: uuid;
};

export const InstanceForm = ({
	type,
	roomId,
	direct_peerId,
}: {
	type: InstanceI["type"];
	roomId?: uuid;
	direct_peerId?: uuid;
}) => {
	const { plugins } = useFetchPlugins();

	async function createInstance(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const name = data.get("instance-name") as string;
		const pluginId = data.get("pluginId") as uuid;

		const reqData: FormBody = { name, pluginId, type };

		switch (type) {
			case "room":
				reqData.roomId = roomId;
				break;
			case "space":
				reqData.roomId = roomId;
				reqData.space_memberIds = [];
				break;
			case "direct":
				reqData.direct_peerId = direct_peerId;
				break;
			case "personal":
				break;
			default:
				return;
		}
		await Api.post(`/instance`, reqData);
	}
	return (
		<form onSubmit={createInstance} className="flex flex-col gap-4">
			<h2>Create {type} plugin</h2>
			<input
				type="text"
				name="instance-name"
				className="border border-white"
				placeholder="name"
			/>
			<label htmlFor="pluginId">Choose a Plugin:</label>
			<select id="pluginId" name="pluginId">
				{plugins
					.filter((plugin) => plugin.supportedInstanceTypes.includes(type))
					.map((plugin) => {
						return (
							<option className="text-black" key={plugin.id} value={plugin.id}>
								{plugin.name}
							</option>
						);
					})}
			</select>
			<button type="submit">Create Instance</button>
		</form>
	);
};
