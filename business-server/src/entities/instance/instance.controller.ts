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

		const existsInInstance = await InstanceService.userExistsInInstance(
			userId,
			instanceId,
		);
		if (!existsInInstance) {
			throw new AppError(403, "Access to instance is forbidden");
		}
		next();
	}
	async get(req: Request, res: Response) {
		const { instanceId } = req.params as { instanceId: uuid };
		const instance = await InstanceService.getInstance(instanceId);
		res.json({ instance });
	}
}

export const InstanceController = new InstanceControllerImpl();
