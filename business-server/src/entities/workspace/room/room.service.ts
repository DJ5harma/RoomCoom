import type { uuid } from "../../../types";
import type { createRoomDTO, updateRoomDTO } from "./room.dto";
import { ROOM } from "./room.model";
import type { RoomType } from "./room.type";

class RoomServiceImpl {
	async createRoom(room: createRoomDTO) {
		const newRoom = (await ROOM.create(room)) as RoomType;
		return newRoom;
	}
	async updateRoomById(roomId: uuid, room: updateRoomDTO) {
		const updatedRoom = (await ROOM.findByIdAndUpdate(roomId, room, {
			new: true,
		})) as RoomType;
		return updatedRoom;
	}
}

export const RoomService = new RoomServiceImpl();
