import type { NextFunction, Request, Response } from "express";

import { AppError } from "../error/AppError";
import { AuthState } from "../auth/auth.state";
import type { uuid } from "../types";
import { RoomService } from "../internal/workspace/room/room.service";
import { GroupService } from "../internal/workspace/group/group.service";

class ManagerAccessImpl {
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
	async authorizeUserGroupAccess(
		req: Request,
		_res: Response,
		next: NextFunction,
	) {
		const { groupId } = req.params as { groupId: uuid };
		const userId = AuthState.getUserId(req);
		const userExistsInGroup = await GroupService.userExistsInGroup(
			groupId,
			userId,
		);
		if (!userExistsInGroup) {
			throw new AppError(403, "Group access is forbidden");
		}
		next();
	}
}

export const ManagerAccess = new ManagerAccessImpl();
