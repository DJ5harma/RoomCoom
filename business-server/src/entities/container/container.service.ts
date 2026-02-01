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
	getContainersInRoom = async (roomId: uuid) =>
		CONTAINER.find({ room: roomId });

	userExistsInContainer = async ({
		userId,
		containerId,
	}: {
		userId: uuid;
		containerId: uuid;
	}) => CONTAINER_MEMBER.exists({ user: userId, container: containerId });
}

export const ContainerService = new ContainerServiceImpl();
