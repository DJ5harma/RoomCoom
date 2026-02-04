import type { Request, Response } from "express";
import { PluginService } from "./plugin.service";

class PluginControllerImpl {
	async getAll(_: Request, res: Response) {
		const plugins = await PluginService.getAll();
		res.json({ plugins });
	}
}
export const PluginController = new PluginControllerImpl();
