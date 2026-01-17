import type { Socket } from "socket.io";
import { MemberService } from "../internal/workspace/member/member.service";
import { io } from "../main";
import type { Data, PluginEnum, uuid } from "../types";

class RealtimeServiceImpl {
	async joinUserToRoomsAndGroups(userId: uuid, socket: Socket) {
		const members = await MemberService.findAllUserIdMembers(userId);
		members.forEach((m) => {
			socket.join(m.room.toString());
			socket.join(m.group.toString());
		});
	}
	sendToUser(targetUserId: uuid, plugin: PluginEnum, data: Data) {
		io.to(targetUserId).emit(plugin, data);
	}
	sendToGroup(targetGroupId: uuid, plugin: PluginEnum, data: Data) {
		io.to(targetGroupId).emit(plugin, data);
	}
}

export const RealtimeService = new RealtimeServiceImpl();
