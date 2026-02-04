import { AppError } from "../../error/AppError";
import { io } from "../../main";
import type { RoomI, uuid } from "../../types";
import { UserService } from "../user/user.service";
import { ROOM } from "./room.model";

const roomPopulateOptions = {
	path: "members",
	populate: { path: "user" },
};

class RoomServiceImpl {
	createRoom = async (name: string, creatorId: uuid) =>
		await ROOM.create({ name, creator: creatorId });

	getRoomById = async (roomId: uuid) =>
		await ROOM.findById(roomId).populate(roomPopulateOptions);

	getUserRooms = async (userId: uuid) =>
		await ROOM.find({ "members.user": userId }).select("-members");

	addUserToRoom = async (roomId: uuid, userId: uuid) => {
		const user = await UserService.findById(userId);
		if (!user) throw new AppError(404, "User not found");

		await ROOM.findByIdAndUpdate(roomId, {
			$addToSet: { members: { user: userId } as RoomI["members"][0] },
		});
		io.to(roomId).emit("room:add:member", { user });
	};

	userExistsInRoom = async (userId: uuid, roomId: uuid) =>
		await ROOM.exists({ _id: roomId, "members.userId": userId });

	getRoomsByIds = async (roomIds: uuid[]) =>
		await ROOM.find({ _id: { $in: roomIds } });
}

export const RoomService = new RoomServiceImpl();
