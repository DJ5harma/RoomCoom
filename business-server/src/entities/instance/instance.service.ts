import { io } from "../../main";
import type { InstanceType, uuid } from "../../types";
import { INSTANCE } from "./instance.model";

const populateOptions = "plugin members";

class InstanceServiceImpl {
	createInstance = async (
		name: string,
		creatorId: uuid,
		type: InstanceType,
		pluginId: uuid,
		{ roomId, members }: { roomId?: uuid; members?: uuid[] },
	) => {
		const instance = new INSTANCE({
			name,
			type,
			plugin: pluginId,
			creator: creatorId,
			members: members ?? [],
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

	getInstance = async (instanceId: uuid) =>
		await INSTANCE.findById(instanceId).populate(populateOptions);

	getInstancesInRoom = async (roomId: uuid) =>
		await INSTANCE.find({ room: roomId }).populate(populateOptions);

	getUserInstances = async (userId: uuid) =>
		await INSTANCE.find({ "members.user": userId }).populate(populateOptions);

	getUserPersonalInstances = async (userId: uuid) =>
		await INSTANCE.find({
			"members.user": userId,
			type: "personal" as InstanceType,
		}).populate(populateOptions);

	getUserDirectInstances = async (userId: uuid) =>
		await INSTANCE.find({
			"members.user": userId,
			type: "direct" as InstanceType,
		}).populate(populateOptions);
}

export const InstanceService = new InstanceServiceImpl();
