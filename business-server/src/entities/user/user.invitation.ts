import Redis from "ioredis";
import type { uuid } from "../../types";
import { RoomService } from "../room/room.service";

const redis = new Redis();

class UserInvitationImpl {
	async storeUserRoomInvitation({
		userId,
		roomId,
	}: {
		userId: uuid;
		roomId: uuid;
	}) {
		const key = `roomInvitation:${userId}:${roomId}`;
		await redis.set(key, "1", "EX", 600);
	}
	async verifyUserRoomInvitationExists({
		userId,
		roomId,
	}: {
		userId: uuid;
		roomId: uuid;
	}) {
		const key = `roomInvitation:${userId}:${roomId}`;
		const exists = await redis.exists(key);
		return exists !== 0;
	}

	async getUserRoomInvitations({ userId }: { userId: uuid }) {
		const pattern = `roomInvitation:${userId}:*`;
		let cursor = "0";
		const roomIds: uuid[] = [];

		do {
			const [nextCursor, keys] = await redis.scan(
				cursor,
				"MATCH",
				pattern,
				"COUNT",
				100,
			);

			cursor = nextCursor;

			for (const key of keys) {
				roomIds.push(key.split(":")[2] as uuid);
			}
		} while (cursor !== "0");

		if (roomIds.length === 0) return [];

		const rooms = await RoomService.getRoomsByIds(roomIds); // MongoDB $in query

		return rooms;
	}
}

export const UserInvitation = new UserInvitationImpl();
