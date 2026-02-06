import { io } from "../../main";
import type { InstanceType, uuid } from "../../types";
import { INSTANCE } from "./instance.model";

const populateOptions = "members";

class InstanceServiceImpl {
	createInstance = async (
		name: string,
		creatorId: uuid,
		type: InstanceType,
		{ roomId, members }: { roomId?: uuid; members?: uuid[] },
	) => {
		const instance = new INSTANCE({
			name,
			type,
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

	userExistsInInstance = async (userId: uuid, instanceId: uuid) => {
		const exists = await INSTANCE.exists({
			_id: instanceId,
			members: userId,
		});
		return !!exists;
	};

	getInstance = async (instanceId: uuid) =>
		await INSTANCE.findById(instanceId).populate(populateOptions);

	getInstancesInRoom = async (roomId: uuid) =>
		await INSTANCE.find({ room: roomId }).populate(populateOptions);

	getUserInstances = async (userId: uuid) =>
		await INSTANCE.find({ members: userId }).populate(populateOptions);

	getUserPersonalInstances = async (userId: uuid) =>
		await INSTANCE.find({
			members: userId,
			type: "personal" as InstanceType,
		}).populate(populateOptions);

	getUserDirectInstances = async (userId: uuid) =>
		await INSTANCE.find({
			members: userId,
			type: "direct" as InstanceType,
		}).populate(populateOptions);
}

export const InstanceService = new InstanceServiceImpl();
