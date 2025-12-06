import type { NextFunction, Request, Response } from "express";
import { GoogleAuthService } from "./google.auth.service";
import type { SavableUser } from "../../user/user.dto";

export const GoogleAuthController = {
	async getConfig(req: Request, res: Response) {
		return res.json(GoogleAuthService.getClientConfig());
	},
	async signin(req: Request, res: Response, next: NextFunction) {
		const { code } = req.body as { code: string };
		const tokens = await GoogleAuthService.getGoogleUserTokens(code);
		const profileInfo = await GoogleAuthService.getUserProfile(tokens);
		const { email, name, picture } = profileInfo;

		req.body = { email, name, picture } as SavableUser;
		next();
	},
};
