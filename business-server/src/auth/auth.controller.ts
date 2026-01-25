import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../entities/user/user.service";
import { ENV_CONSTANTS } from "../constants/env.constants";
import { AuthState } from "./auth.state";
import { AppError } from "../error/AppError";
import { AuthService } from "./auth.service";

export const AuthController = {
	async handleUserProfile(req: Request, res: Response) {
		console.log("authed user: ", req.user);

		const { email, name, pictureUrl } = req.user as {
			email: string;
			name: string;
			pictureUrl: string;
		};

		let user = await UserService.findByEmail(email);

		if (!user) {
			user = await UserService.create({ email, name, pictureUrl });
		}
		const access_token = jwt.sign(
			{ userId: user.id },
			ENV_CONSTANTS.ACCESS_SECRET,
		);
		res.cookie("access_token", access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
		});
		res.redirect(ENV_CONSTANTS.WEB_URL);
	},
	async middlewareAuth(req: Request, _res: Response, next: NextFunction) {
		const { access_token } = req.cookies;

		// console.log("from cookies:", { access_token });
		try {
			const { userId } = AuthService.verifyUser(access_token);

			AuthState.storeUserId(req, userId);
			next();
		} catch (error) {
			throw new AppError(404, "unauthorized");
		}
	},
};
