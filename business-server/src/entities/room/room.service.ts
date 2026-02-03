import { io } from "../../main";
import type { uuid } from "../../types";
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
		await ROOM.findByIdAndUpdate(roomId, {
			$addToSet: { members: { user: userId } },
		});
		io.to(roomId).emit("room:add:member", { userId });
	};

	userExistsInRoom = async (userId: uuid, roomId: uuid) =>
		await ROOM.exists({ _id: roomId, "members.userId": userId });

	getRoomsByIds = async (roomIds: uuid[]) =>
		await ROOM.find({ _id: { $in: roomIds } });
}

export const RoomService = new RoomServiceImpl();
