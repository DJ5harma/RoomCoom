import type { NextFunction, Request, Response } from "express";
import type { uuid } from "../../types";
import { SpaceService } from "./space.service";
import { AuthState } from "../../auth/auth.state";
import { AppError } from "../../error/AppError";
import { UserService } from "../user/user.service";

class SpaceControllerImpl {
	async authorizeUser(req: Request, _res: Response, next: NextFunction) {
		const userId = AuthState.getUserId(req);
		const spaceId =
			req.body?.spaceId || req.params.spaceId || req.query.spaceId;

		if (!spaceId) {
			next();
			return;
		}
		const existsInSpace = await SpaceService.userExistsInSpace(userId, spaceId);
		if (!existsInSpace) {
			throw new AppError(403, "Access to Space is forbidden");
		}
		next();
	}
	async create(req: Request, res: Response) {
		const { name, memberIds } = req.body as {
			name: string;
			roomId: uuid;
			memberIds?: uuid[];
		};

		const creatorId = AuthState.getUserId(req);

		if (memberIds && memberIds.length > 0) {
			const membersExist = await UserService.existByIds(memberIds);
			if (!membersExist) {
				throw new AppError(
					400,
					`Not all of the included members exist in the system`,
				);
			}
		}

		const space = await SpaceService.createSpace(
			name,
			creatorId,
			memberIds ?? [],
		);
		res.json({ space });
	}

	async get(req: Request, res: Response) {
		const { spaceId } = req.params as { spaceId: uuid };
		const space = await SpaceService.getSpaceById(spaceId);
		res.json({ space });
	}
}

export const SpaceController = new SpaceControllerImpl();
