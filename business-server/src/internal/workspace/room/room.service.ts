import type { uuid } from "../../../types";
import { GROUP } from "../group/group.model";
import type { GroupType } from "../group/group.type";
import { MEMBER } from "../member/member.model";
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
	async getGroupsInRoom(roomId: uuid) {
		const grps = (await GROUP.find({ room: roomId })) as GroupType[];
		return grps;
	}
	async getRoomsForUser(userId: uuid) {
		const rooms = await MEMBER.find({
			user: userId,
		})
			.select("+room")
			.populate("room");
		return rooms.map(({ room }) => room);
	}
}

export const RoomService = new RoomServiceImpl();
