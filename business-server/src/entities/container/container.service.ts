import { io } from "../../main";
import type { ContainerTypeEnum, Data, uuid } from "../../types";
import { CONTAINER } from "./container.model";

class ContainerServiceImpl {
	async create({
		name,
		roomId,
		type,
	}: {
		name: string;
		roomId: uuid;
		type: ContainerTypeEnum;
	}) {
		const container = await CONTAINER.create({ name, room: roomId, type });
		return container;
	}
	sendMessage({ containerId, message }: { containerId: uuid; message: Data }) {
		io.to(containerId).emit("message", message);
	}
}
export const ContainerService = new ContainerServiceImpl();
