import { AppError } from "../../error/AppError";
import type { RoomI, uuid } from "../../types";
import { UserService } from "../user/user.service";
import { ROOM } from "./room.model";

const roomPopulateOptions = {
	path: "members spaces",
	populate: { path: "user" },
};

class RoomServiceImpl {
	createRoom = async (name: string, creatorId: uuid) =>
		await ROOM.create({ name, creator: creatorId });

	getRoomById = async (roomId: uuid) =>
		await ROOM.findById(roomId).populate(roomPopulateOptions);

	getRoomMemberIds = async (roomId: uuid) => {
		const room = await ROOM.findById(roomId).select("members");
		if (!room) throw new AppError(404, "Room Not Found");
		return room.members.map(({ user: userId }) => userId) as uuid[];
	};

	getUserRooms = async (userId: uuid) =>
		await ROOM.find({ "members.user": userId }).select("-members");

	addUserToRoom = async (roomId: uuid, userId: uuid) => {
		const user = await UserService.findById(userId);
		if (!user) throw new AppError(404, "User not found");

		await ROOM.findByIdAndUpdate(roomId, {
			$addToSet: { members: { user: userId } as RoomI["members"][0] },
		});
	};

	userExistsInRoom = async (userId: uuid, roomId: uuid) =>
		await ROOM.exists({ _id: roomId, "members.userId": userId });

	getRoomsByIds = async (roomIds: uuid[]) =>
		await ROOM.find({ _id: { $in: roomIds } });
}

export const RoomService = new RoomServiceImpl();
