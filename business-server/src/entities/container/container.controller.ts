import type { NextFunction, Request, Response } from "express";
import type { uuid } from "../../types";
import { ContainerService } from "./container.service";
import { AuthState } from "../../auth/auth.state";
import { AppError } from "../../error/AppError";

class ContainerControllerImpl {
	async authorizeUser(req: Request, _res: Response, next: NextFunction) {
		const userId = AuthState.getUserId(req);
		const containerId =
			req.body.containerId || req.params.containerId || req.query.containerId;
		if (!containerId) {
			next();
			return;
		}
		const existsInRoom = ContainerService.userExistsInContainer({
			userId,
			containerId,
		});
		if (!existsInRoom) {
			throw new AppError(403, "Access to room is forbidden");
		}
		next();
	}
	async create(req: Request, res: Response) {
		const { roomId, name } = req.body;
		const container = await ContainerService.createContainer({
			name,
			roomId,
		});
		res.json({ container });
	}
	async get(req: Request, res: Response) {
		const { containerId } = req.params as { containerId: uuid };
		const container = await ContainerService.getContainerById(containerId);
		res.json(container);
	}
}

export const ContainerController = new ContainerControllerImpl();
