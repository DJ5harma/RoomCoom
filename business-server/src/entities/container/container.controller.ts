import type { Request, Response } from "express";
import type { uuid } from "../../types";
import { ContainerService } from "./container.service";

class ContainerControllerImpl {
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
