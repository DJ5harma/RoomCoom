import type { InstanceI, uuid } from "../../types";
import { INSTANCE } from "./instance.model";
import { INSTANCE_MEMBER } from "./instanceMember.model";

class InstanceServiceImpl {
	createInstance = async ({
		name,
		roomId,
	}: {
		name: string;
		roomId: uuid;
	}) => {
		const instance = await INSTANCE.create({ name, room: roomId });
		return instance;
	};
	addUserToInstance = async ({
		instanceId,
		userId,
	}: {
		instanceId: uuid;
		userId: uuid;
	}) => {
		await INSTANCE_MEMBER.create({ instance: instanceId, user: userId });
	};

	userExistsInInstance = async ({
		userId,
		instanceId,
	}: {
		userId: uuid;
		instanceId: uuid;
	}) => {
		return await INSTANCE_MEMBER.exists({
			user: userId,
			instance: instanceId,
		});
	};
	getInstancesInRoom = async (roomId: uuid) =>
		await INSTANCE.find({ room: roomId });

	getInstance = async (instanceId: uuid) => {
		return await INSTANCE.findById(instanceId);
	};
	getMembers = async (instanceId: uuid) => {
		const memberInstances = await INSTANCE_MEMBER.find({
			instance: instanceId,
		}).select("user");
		const members = memberInstances.map(({ user }) => user);
		return members;
	};

	getUserInstances = async ({ userId }: { userId: uuid }) => {
		const instanceInstances = await INSTANCE_MEMBER.find({ user: userId })
			.select("instance")
			.populate("instance");
		const instances = instanceInstances.map(
			({ instance }) => instance,
		) as InstanceI[];
		return instances;
	};
}

export const InstanceService = new InstanceServiceImpl();
