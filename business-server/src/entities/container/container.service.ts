import type { uuid } from "../../types";
import { CONTAINER } from "./container.model";
import { CONTAINER_MEMBER } from "./containerMember.model";

class ContainerServiceImpl {
	createContainer = async ({
		name,
		roomId,
	}: {
		name: string;
		roomId: uuid;
	}) => {
		const container = await CONTAINER.create({ name, room: roomId });
		return container;
	};
	addUserToContainer = async ({
		containerId,
		userId,
	}: {
		containerId: uuid;
		userId: uuid;
	}) => {
		await CONTAINER_MEMBER.create({ container: containerId, user: userId });
	};

	userExistsInContainer = async ({
		userId,
		containerId,
	}: {
		userId: uuid;
		containerId: uuid;
	}) => {
		return await CONTAINER_MEMBER.exists({
			user: userId,
			container: containerId,
		});
	};

	getContainersInRoom = async (roomId: uuid) =>
		await CONTAINER.find({ room: roomId });

	getContainer = async (containerId: uuid) => {
		return await CONTAINER.findById(containerId);
	};
	getMembers = async (containerId: uuid) => {
		const memberInstances = await CONTAINER_MEMBER.find({
			container: containerId,
		}).select("user");
		const members = memberInstances.map(({ user }) => user);
		return members;
	};
}

export const ContainerService = new ContainerServiceImpl();
