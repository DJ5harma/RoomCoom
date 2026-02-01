import type { uuid } from "../../types";
import { CONTAINER } from "./container.model";

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
}

export const ContainerService = new ContainerServiceImpl();
