import { io } from "../../main";
import type { InstanceI, PluginEnum, uuid } from "../../types";
import { INSTANCE } from "./instance.model";

class InstanceServiceImpl {
	createInstance = async (
		name: string,
		creatorId: uuid,
		type: InstanceI["type"],
		plugin: PluginEnum,
		{ roomId }: { roomId?: uuid },
	) => {
		const instance = new INSTANCE({
			name,
			type,
			plugin,
			creator: creatorId,
		});
		if (roomId) instance.room = roomId;
		await instance.save();
		return instance;
	};
	addUserToInstance = async (instanceId: uuid, userId: uuid) => {
		await INSTANCE.findByIdAndUpdate(instanceId, {
			$addToSet: { members: userId },
		});
		io.to(instanceId).emit("instance:add:member", { userId });
	};

	userExistsInInstance = async (userId: uuid, instanceId: uuid) =>
		await INSTANCE.exists({ _id: instanceId, "members.user.userId": userId });

	getInstancesInRoom = async (roomId: uuid) =>
		await INSTANCE.find({ room: roomId });

	getInstance = async (instanceId: uuid) => await INSTANCE.findById(instanceId);

	getUserInstances = async (userId: uuid) =>
		await INSTANCE.find({ "members.user": userId });
}

export const InstanceService = new InstanceServiceImpl();
