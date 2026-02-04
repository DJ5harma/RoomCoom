import { Api } from "@/utils/Api";
import { FormEvent, useState } from "react";
import { InstanceI, InstanceType, uuid } from "@/utils/types";
import { useFetchPlugins } from "../plugins/useFetchPlugins";
import { UserSearch } from "../user/UserSearch";
import { useModal } from "@/components/ModalWrapper";

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
}: {
	type: InstanceI["type"];
	roomId?: uuid;
}) => {
	const { plugins } = useFetchPlugins();
	const [chosenUserIds, setChosenUserIds] = useState<uuid[]>([]);
	const { close } = useModal();

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
				reqData.space_memberIds = chosenUserIds;
				break;
			case "direct":
				reqData.direct_peerId = chosenUserIds[0];
				break;
			case "personal":
				break;
			default:
				return;
		}
		Api.post(`/instance`, reqData).then(close);
	}
	return (
		<form onSubmit={createInstance} className="flex flex-col gap-4">
			<h2>Create {type} instance</h2>
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
			<p>Select User(s):</p>
			{type === "space" && (
				<UserSearch
					onSelected={(users) => setChosenUserIds(users.map(({ id }) => id))}
					selectLimit={20}
				/>
			)}
			{type === "direct" && (
				<UserSearch
					onSelected={(users) => setChosenUserIds(users.map(({ id }) => id))}
					selectLimit={1}
				/>
			)}
			<button type="submit">Create Instance</button>
		</form>
	);
};
