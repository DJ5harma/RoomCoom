import type { Request, Response } from "express";
import { ContainerService } from "./container.service";

class ContainerControllerImpl {
	async create(req: Request, res: Response) {
		const { roomId, type, name } = req.body;
		const container = await ContainerService.create({ name, roomId, type });
		res.json({ container });
	}
}

export const ContainerController = new ContainerControllerImpl();
