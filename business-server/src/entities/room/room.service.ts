import type { uuid } from "../../types";
import { ROOM } from "./room.model";
import { ROOM_MEMBER } from "./roomMember.model";

class RoomServiceImpl {
	getRoomById = async (roomId: uuid) => await ROOM.findById(roomId);

	addUserToRoom = async ({
		roomId,
		userId,
	}: {
		roomId: uuid;
		userId: uuid;
	}) => {
		await ROOM_MEMBER.create({ room: roomId, user: userId });
	};

	createRoom = async ({ name, creatorId }: { name: string; creatorId: uuid }) =>
		ROOM.create({ name, creator: creatorId });

	getUserRooms = async ({ userId }: { userId: uuid }) => {
		const memberInstances = await ROOM_MEMBER.find({ user: userId })
			.select("room")
			.populate("room");
		const rooms = memberInstances.map(({ room }) => room);
		return rooms;
	};
	getRoomMembers = async ({ roomId }: { roomId: uuid }) => {
		const memberInstances = await ROOM_MEMBER.find({ room: roomId })
			.select("user")
			.populate("user");
		const members = memberInstances.map(({ user }) => user);
		return members;
	};
	userExistsInRoom = async ({
		userId,
		roomId,
	}: {
		userId: uuid;
		roomId: uuid;
	}) => ROOM_MEMBER.exists({ room: roomId, user: userId });
}

export const RoomService = new RoomServiceImpl();
