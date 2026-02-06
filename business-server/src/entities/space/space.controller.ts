import type { NextFunction, Request, Response } from "express";
import type { uuid } from "../../types";
import { SpaceService } from "./space.service";
import { AuthState } from "../../auth/auth.state";
import { AppError } from "../../error/AppError";
import { UserService } from "../user/user.service";
import { io } from "../../main";

class SpaceControllerImpl {
	async authorizeUser(req: Request, _res: Response, next: NextFunction) {
		const userId = AuthState.getUserId(req);
		const SpaceId =
			req.body?.SpaceId || req.params.SpaceId || req.query.SpaceId;

		if (!SpaceId) {
			next();
			return;
		}
		const existsInSpace = await SpaceService.userExistsInSpace(userId, SpaceId);
		if (!existsInSpace) {
			throw new AppError(403, "Access to Space is forbidden");
		}
		next();
	}
	async create(req: Request, res: Response) {
		const { name, roomId, memberIds } = req.body as {
			name: string;
			roomId: uuid;
			memberIds: uuid[];
		};

		const creatorId = AuthState.getUserId(req);

		if (memberIds.length > 0) {
			const membersExist = await UserService.existByIds(memberIds);
			if (!membersExist) {
				throw new AppError(
					400,
					`Not all of the included members exist in the system`,
				);
			}
		}

		const space = await SpaceService.createSpace(name, creatorId, {
			roomId,
			memberIds,
		});
		io.to(roomId).emit(`room:${roomId}:add:space`, { space });
		res.json({ space });
	}

	async get(req: Request, res: Response) {
		const { spaceId } = req.params as { spaceId: uuid };
		const space = await SpaceService.getSpace(spaceId);
		res.json({ space });
	}
}

export const SpaceController = new SpaceControllerImpl();
