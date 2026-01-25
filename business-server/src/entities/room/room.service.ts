import { io } from "../../main";
import type { uuid } from "../../types";
import { UserService } from "../user/user.service";
import { ROOM } from "./room.model";

class RoomServiceImpl {
	async createRoom({ name, makerId }: { name: string; makerId: uuid }) {
		const room = await ROOM.create({ name, users: [makerId] });
		return room;
	}
	async joinRoom({ joinerId, roomId }: { joinerId: uuid; roomId: uuid }) {
		const room = await ROOM.findOneAndUpdate(
			{ _id: roomId },
			{ $push: { users: joinerId } },
			{ new: true },
		);
		const joiner = await UserService.findById(joinerId);
		io.to(roomId).emit("room/new-joiner", { joiner });
		return room;
	}
}

export const RoomService = new RoomServiceImpl();
