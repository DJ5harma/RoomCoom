import type { Request, Response } from "express";
import { PluginService } from "./plugin.service";
import type { InstanceType } from "../../types";

class PluginControllerImpl {
	async getAll(_: Request, res: Response) {
		const plugins = await PluginService.getAll();
		res.json({ plugins });
	}
	async getSupported(req: Request, res: Response) {
		const { instanceType } = req.params as { instanceType: InstanceType };

		const supported =
			await PluginService.getSupportedByInstanceType(instanceType);
		res.json({ plugins: supported });
	}
}
export const PluginController = new PluginControllerImpl();
