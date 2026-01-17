import type { Request, Response } from "express";
import { AuthState } from "../auth/auth.state";
import { RoomService } from "../internal/workspace/room/room.service";
import { GroupService } from "../internal/workspace/group/group.service";
import { MemberService } from "../internal/workspace/member/member.service";
import { PluginEnum, type uuid } from "../types";
import { RealtimeService } from "../realtime/realtime.service";

class ManagerControllerImpl {
	async getMyRooms(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const rooms = await RoomService.getRoomsForUser(userId);
		res.json({ rooms });
	}
	async createRoom(req: Request, res: Response) {
		const { roomName } = req.body;
		const room = await RoomService.createRoom({ name: roomName });
		const group = await GroupService.createGroup({
			name: "DEFAULT",
			room: room.id,
		});

		const userId = AuthState.getUserId(req);
		await MemberService.createMember({
			room: room.id,
			group: group.id,
			user: userId,
		});

		res.json({ room });
	}

	async getRoom(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		const room = await RoomService.getRoomById(roomId);
		const groups = await RoomService.getGroupsInRoom(roomId);
		const members = await RoomService.getMembersInRoom(roomId);
		res.json({ room, groups, members });
	}

	async createGroup(req: Request, res: Response) {
		const { groupName } = req.body;
		const { roomId } = req.params as { roomId: string };

		const userId = AuthState.getUserId(req);

		const group = await GroupService.createGroup({
			name: groupName,
			room: roomId,
		});
		const member = await MemberService.createMember({
			group: group.id,
			room: roomId,
			user: userId,
		});
		res.json({ group, member });
	}

	async addMemberToGroup(req: Request, res: Response) {
		const { roomId, groupId } = req.params as { roomId: uuid; groupId: uuid };

		const { userId } = req.body as { userId: uuid };

		const member = await MemberService.createMember({
			group: groupId,
			room: roomId,
			user: userId,
		});

		RealtimeService.sendToGroup(groupId, PluginEnum.ROOM, {
			memberJoined: member,
		});
		RealtimeService.sendToUser(userId, PluginEnum.ROOM, {
			joinedGroup: groupId,
		});

		res.json({ member });
	}
}

export const ManagerController = new ManagerControllerImpl();
