import type { NextFunction, Request, Response } from "express";
import type { uuid } from "../../types";
import { InstanceService } from "./instance.service";
import { AuthState } from "../../auth/auth.state";
import { AppError } from "../../error/AppError";

class InstanceControllerImpl {
	async authorizeUser(req: Request, _res: Response, next: NextFunction) {
		const userId = AuthState.getUserId(req);
		const instanceId =
			req.body?.instanceId || req.params.instanceId || req.query.instanceId;

		const existsInInstance = await InstanceService.userExistsInInstance({
			userId,
			instanceId,
		});
		if (!existsInInstance) {
			throw new AppError(403, "Access to instance is forbidden");
		}
		next();
	}
	async create(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		const { name } = req.body;
		const userId = AuthState.getUserId(req);
		const instance = await InstanceService.createInstance({
			name,
			roomId,
		});
		await InstanceService.addUserToInstance({
			instanceId: instance.id,
			userId,
		});
		res.json({ instance });
	}
	async get(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const instance = await InstanceService.getInstance(instanceId);
		res.json({ instance });
	}
	async getMembers(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const members = await InstanceService.getMembers(instanceId);
		res.json({ members });
	}
}

export const InstanceController = new InstanceControllerImpl();
