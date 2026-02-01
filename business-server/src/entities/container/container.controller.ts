import type { NextFunction, Request, Response } from "express";
import type { uuid } from "../../types";
import { ContainerService } from "./container.service";
import { AuthState } from "../../auth/auth.state";
import { AppError } from "../../error/AppError";

class ContainerControllerImpl {
	async authorizeUser(req: Request, _res: Response, next: NextFunction) {
		const userId = AuthState.getUserId(req);
		const containerId =
			req.body?.containerId || req.params.containerId || req.query.containerId;

		const existsInContainer = await ContainerService.userExistsInContainer({
			userId,
			containerId,
		});
		if (!existsInContainer) {
			throw new AppError(403, "Access to container is forbidden");
		}
		next();
	}
	async create(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		const { name } = req.body;
		const userId = AuthState.getUserId(req);
		const container = await ContainerService.createContainer({
			name,
			roomId,
		});
		await ContainerService.addUserToContainer({
			containerId: container.id,
			userId,
		});
		res.json({ container });
	}
	async get(req: Request, res: Response) {
		const { containerId } = req.params as { containerId: uuid };
		const container = await ContainerService.getContainer(containerId);
		res.json({ container });
	}
	async getMembers(req: Request, res: Response) {
		const { containerId } = req.params as { containerId: uuid };
		const container = await ContainerService.getMembers(containerId);
		res.json({ container });
	}
}

export const ContainerController = new ContainerControllerImpl();
