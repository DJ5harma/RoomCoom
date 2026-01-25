import type { Request, Response } from "express";
import { ContainerService } from "./container.service";
import type { uuid } from "../../types";

class ContainerControllerImpl {
	async create(req: Request, res: Response) {
		const { roomId, type, name } = req.body;
		const container = await ContainerService.create({ name, roomId, type });
		res.json({ container });
	}
	async get(req: Request, res: Response) {
		const { containerId } = req.params as { containerId: uuid };
		const container = await ContainerService.findById(containerId);
		res.json(container);
	}
}

export const ContainerController = new ContainerControllerImpl();
