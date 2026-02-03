import type { UserI, uuid } from "../../types";
import { ROOM } from "./room.model";
import { MEMBER } from "../shared/member.modal";

class RoomServiceImpl {
	getRoomById = async (roomId: uuid) => await ROOM.findById(roomId);

	addUserToRoom = async ({
		roomId,
		userId,
	}: {
		roomId: uuid;
		userId: uuid;
	}) => {
		await MEMBER.create({ room: roomId, user: userId });
	};

	createRoom = async ({ name, creatorId }: { name: string; creatorId: uuid }) =>
		ROOM.create({ name, creator: creatorId });

	getUserRooms = async ({ userId }: { userId: uuid }) => {
		const memberInstances = await MEMBER.find({ user: userId })
			.select("room")
			.populate("room");
		const rooms = memberInstances.map(({ room }) => room);
		return rooms;
	};
	getRoomMembers = async ({ roomId }: { roomId: uuid }) => {
		const memberInstances = (await MEMBER.find({ room: roomId })
			.select("user")
			.populate("user")) as { user: UserI }[];

		const map: { [userId: uuid]: UserI } = {};
		memberInstances.forEach(({ user }) => {
			map[user.id] = user;
		});
		return map;
	};
	userExistsInRoom = async ({
		userId,
		roomId,
	}: {
		userId: uuid;
		roomId: uuid;
	}) => MEMBER.exists({ room: roomId, user: userId });

	getRoomsByIds = async ({ roomIds }: { roomIds: uuid[] }) => {
		const rooms = await ROOM.find({ _id: { $in: roomIds } });
		return rooms;
	};
}

export const RoomService = new RoomServiceImpl();
