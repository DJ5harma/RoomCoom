import type { NextFunction, Request, Response } from "express";
import { GoogleAuthService } from "./google.auth.service";
import type { CreatableUser } from "../../user/user.dto";

export const GoogleAuthController = {
	async getConfig(req: Request, res: Response) {
		return res.json(GoogleAuthService.getClientConfig());
	},
	async signin(req: Request, res: Response, next: NextFunction) {
		// console.log("google auth signin req body", req.body);
		const { code } = req.body as { code: string };
		const tokens = await GoogleAuthService.getGoogleUserTokens(code);
		// console.log({ tokens });

		const profileInfo = await GoogleAuthService.getUserProfile(tokens);
		// console.log({ profileInfo });
		const { email, name, picture } = profileInfo;

		req.body = { email, name, picture } as CreatableUser;
		next();
	},
};
