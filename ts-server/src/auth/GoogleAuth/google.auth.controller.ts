import type { Request, Response } from "express";
import { GoogleAuthService } from "./google.auth.service";

export const GoogleAuthController = {
	async getConfig(req: Request, res: Response) {
		return GoogleAuthService.getClientConfig();
	},
};
