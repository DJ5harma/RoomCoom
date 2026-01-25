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
	findById = (id: uuid) => CONTAINER.findById(id);
	async getContainersInsideRoom(roomId: uuid){
		const containers = await CONTAINER.find({room: roomId});
		return containers; 
	}
}
export const ContainerService = new ContainerServiceImpl();
