import type { uuid } from "../../types";
import { ROOM } from "./room.model";
import { ROOM_MEMBER } from "./roomMember.model";

class RoomServiceImpl {
	getRoomById = ROOM.findById;
	userExistsInRoom = async ({
		userId,
		roomId,
	}: {
		userId: uuid;
		roomId: uuid;
	}) => ROOM_MEMBER.exists({ room: roomId, user: userId });

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
		const memberInstances = await ROOM_MEMBER.find({ user: userId }).select(
			"room",
		);
		const rooms = memberInstances.map(({ room }) => room);
		return rooms;
	};
}

export const RoomService = new RoomServiceImpl();
