import type { NextFunction, Request, Response } from "express";
import { AuthState } from "../auth/auth.state";
import { RoomService } from "../internal/workspace/room/room.service";
import { GroupService } from "../internal/workspace/group/group.service";
import { MemberService } from "../internal/workspace/member/member.service";
import type { uuid } from "../types";
import { AppError } from "../error/AppError";

class ManagerControllerImpl {
	async authorizeUserRoomAccess(
		req: Request,
		_res: Response,
		next: NextFunction,
	) {
		const { roomId } = req.params as { roomId: uuid };
		const userId = AuthState.getUserId(req);

		const userExistsInRoom = await RoomService.userExistsInRoom(roomId, userId);

		if (!userExistsInRoom) {
			throw new AppError(403, "Room access is forbidden");
		}
		next();
	}

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
}

export const ManagerController = new ManagerControllerImpl();
