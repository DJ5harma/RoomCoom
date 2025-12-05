import type { Request, Response } from "express";
import { GoogleAuthService } from "./google.auth.service";

export const GoogleAuthController = {
	async getConfig(req: Request, res: Response) {
		return res.json(GoogleAuthService.getClientConfig());
	},
	async signin(req: Request, res: Response) {
		const { code } = req.body as { code: string };
		const tokens = await GoogleAuthService.getGoogleUserTokens(code);
		const profileInfo = await GoogleAuthService.getUserProfile(tokens);
        
	},
};
