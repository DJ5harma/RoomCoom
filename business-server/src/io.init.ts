import type { Socket } from "socket.io";
import { AuthState } from "./auth/auth.state";
import { SpaceService } from "./entities/space/space.service";
import { RoomService } from "./entities/room/room.service";
import type { InstanceType, uuid } from "./types";
import { DrawyyIO } from "./plugins/drawyy/drawyy.io";

const PLUGIN_HANDLERS: ((sourceId: uuid, socket: Socket) => void)[] = [DrawyyIO];

export function IOinit(socket: Socket) {
	const userId = AuthState.getUserIdSocket(socket);

	socket.on(`join:${"personal" as InstanceType}`, () => {
		socket.join(userId);
		PLUGIN_HANDLERS.forEach((h) => h(userId, socket));
	});
	socket.on(`leave:${"personal" as InstanceType}`, () => {
		socket.leave(userId);
	});

	socket.on(`join:${"direct" as InstanceType}`, async ({ directId }) => {
		const allow = await SpaceService.userExistsInSpace(userId, directId);
		if (!allow) {
			console.warn("Access to join denied");
			return;
		}
		socket.join(directId);
		PLUGIN_HANDLERS.forEach((h) => h(directId, socket));
	});
	socket.on(`leave:${"direct" as InstanceType}`, ({ directId }) => {
		socket.leave(directId);
	});

	socket.on(`join:${"club" as InstanceType}`, async ({ clubId }) => {
		const allow = await SpaceService.userExistsInSpace(userId, clubId);
		if (!allow) {
			console.warn("Access to join denied");
			return;
		}
		socket.join(clubId);
		PLUGIN_HANDLERS.forEach((h) => h(clubId, socket));
	});
	socket.on(`leave:${"club" as InstanceType}`, ({ clubId }) => {
		socket.leave(clubId);
	});

	socket.on(`join:${"room" as InstanceType}`, async ({ roomId }) => {
		const allow = await RoomService.userExistsInRoom(userId, roomId);
		if (!allow) {
			console.warn("Access to join denied");
			return;
		}
		socket.join(roomId);
		PLUGIN_HANDLERS.forEach((h) => h(roomId, socket));
	});
	socket.on(`leave:${"room" as InstanceType}`, ({ roomId }) => {
		socket.leave(roomId);
	});
}
