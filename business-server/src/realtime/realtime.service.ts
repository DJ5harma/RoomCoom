import { io } from "../main";
import type { Data, PluginEnum, uuid } from "../types";

class RealtimeServiceImpl {
	sendToUser(targetUserId: uuid, plugin: PluginEnum, data: Data) {
		io.to(targetUserId).emit(plugin, data);
	}
	sendToGroup(targetGroupId: uuid, plugin: PluginEnum, data: Data) {
		io.to(targetGroupId).emit(plugin, data);
	}
	sendToRoom(targetRoomId: uuid, plugin: PluginEnum, data: Data) {
		io.to(targetRoomId).emit(plugin, data);
	}
}

export const RealtimeService = new RealtimeServiceImpl();
