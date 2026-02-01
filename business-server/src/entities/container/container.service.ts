import type { uuid } from "../../types";
import { CONTAINER } from "./container.model";
import { CONTAINER_MEMBER } from "./containerMember.model";

class ContainerServiceImpl {
	getContainerById = CONTAINER.findById;
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
	}) => CONTAINER_MEMBER.exists({ user: userId, container: containerId });

	
	getContainersInRoom = async (roomId: uuid) =>
		(await CONTAINER.find({ room: roomId }));
}

export const ContainerService = new ContainerServiceImpl();
