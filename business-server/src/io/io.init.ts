import type { Socket } from "socket.io";
import { AuthState } from "../auth/auth.state";
import { SpaceService } from "../entities/space/space.service";
import { RoomService } from "../entities/room/room.service";
import type { InstanceType } from "../types";

export function IOinit(socket: Socket) {
	const userId = AuthState.getUserIdSocket(socket);
	socket.on(`join:${"personal" as InstanceType}`, ({ myId }) => {
		const allow = userId === myId;
		if (!allow) {
			console.warn("Access to join denied");
			return;
		}
		socket.join(myId);
	});
	socket.on(`join:${"direct" as InstanceType}`, async ({ peerId }) => {
		const allow = await SpaceService.doExactlyTheseMembersExistInAnySpace([
			userId,
			peerId,
		]);
		if (!allow) {
			console.warn("Access to join denied");
			return;
		}
		socket.join(`${userId}:${peerId}`);
		socket.join(`${peerId}:${userId}`);
	});
	socket.on(`join:${"club" as InstanceType}`, async ({ clubId }) => {
		const allow = await SpaceService.userExistsInSpace(userId, clubId);
		if (!allow) {
			console.warn("Access to join denied");
			return;
		}
		socket.join(clubId);
	});
	socket.on(`join:${"room" as InstanceType}`, async ({ roomId }) => {
		const allow = await RoomService.userExistsInRoom(userId, roomId);
		if (!allow) {
			console.warn("Access to join denied");
			return;
		}
		socket.join(roomId);
	});
}
