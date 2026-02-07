import { AppError } from "../../error/AppError";
import type { RoomI, uuid } from "../../types";
import { ROOM } from "./room.model";

const roomPopulateOptions = {
	path: "members clubs",
	populate: { path: "user" },
};

class RoomServiceImpl {
	createRoom = async (
		name: string,
		creatorId: uuid,
		members: RoomI["members"],
	) => await ROOM.create({ name, creator: creatorId, members });

	getRoomById = async (roomId: uuid) =>
		await ROOM.findById(roomId).populate(roomPopulateOptions);

	getRoomMemberIds = async (roomId: uuid) => {
		const room = await ROOM.findById(roomId).select("members");
		if (!room) throw new AppError(404, "Room Not Found");
		return room.members.map(({ user: userId }) => userId) as uuid[];
	};

	getUserRooms = async (userId: uuid) =>
		await ROOM.find({ "members.user": userId }).populate(roomPopulateOptions);

	addUserToRoom = async (roomId: uuid, userId: uuid) => {
		await ROOM.findByIdAndUpdate(roomId, {
			$addToSet: { members: { user: userId } as RoomI["members"][0] },
		});
	};

	addClubToRoom = async (roomId: uuid, clubId: uuid) => {
		await ROOM.findByIdAndUpdate(roomId, {
			$addToSet: { clubs: { club: clubId } as RoomI["clubs"][0] },
		});
	};

	userExistsInRoom = async (userId: uuid, roomId: uuid) =>
		await ROOM.exists({ _id: roomId, "members.userId": userId });

	getRoomsByIds = async (roomIds: uuid[]) =>
		await ROOM.find({ _id: { $in: roomIds } });
}

export const RoomService = new RoomServiceImpl();
