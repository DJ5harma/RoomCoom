import type { Socket } from "socket.io";
import { PluginEnum, type uuid } from "../types";
import { RoomService } from "../internal/workspace/room/room.service";
import { MemberService } from "../internal/workspace/member/member.service";
import { GroupService } from "../internal/workspace/group/group.service";

export function RealtimeHandler(socket: Socket) {
	const userId = socket.data.userId as uuid;
	socket.join(userId);

	socket.on(`${PluginEnum.ROOM}/sync-me`, async () => {
		const members = await MemberService.findAllUserIdMembers(userId);

		members.forEach(({ room, group }) => {
			socket.join(room.toString());
			socket.join(group.toString());
		});
	});
	socket.on(
		`${PluginEnum.ROOM}/join-room`,
		async ({ roomId }: { roomId: uuid }) => {
			const existsInRoom = await RoomService.userExistsInRoom(roomId, userId);
			if (!existsInRoom) {
				socket.emit("error", "Access to join this room is Forbidden for you");
				return;
			}
			socket.join(roomId);
		},
	);
	socket.on(
		`${PluginEnum.ROOM}/join-group`,
		async ({ groupId }: { groupId: uuid }) => {
			const existsInGroup = await GroupService.userExistsInGroup(
				groupId,
				userId,
			);
			if (!existsInGroup) {
				socket.emit("error", "Access to join this group is Forbidden for you");
				return;
			}
			socket.join(groupId);
		},
	);
}
