import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../entities/user/user.service";
import type { createUserDTO } from "../entities/user/user.dto";
import { ENV_CONSTANTS } from "../constants/env.constants";
import { AuthState } from "./auth.state";
import { AppError } from "../error/AppError";

export const AuthController = {
	async handleUserProfile(req: Request, res: Response) {
		const { email, name, pictureUrl } = req.user as createUserDTO;

		let user = await UserService.findByEmail(email);

		if (!user) {
			user = await UserService.create({ email, name, pictureUrl });
		}
		const access_token = jwt.sign(
			{ userId: user.id },
			ENV_CONSTANTS.ACCESS_SECRET
		);
		res.cookie("access_token", access_token, {
			httpOnly: true,
			secure: true,
		});
		res.json({
			success: true,
			message: "Authenticated successfully",
		});
	},
	async middlewareAuth(req: Request, res: Response) {
		const { access_token } = req.cookies;

		console.log("from cookies:", { access_token });
		try {
			const { userId } = jwt.verify(
				access_token,
				ENV_CONSTANTS.ACCESS_SECRET
			) as { userId: string };
			AuthState.storeUserId(req, userId);
		} catch (error) {
			throw new AppError(404, "Unauthorized");
		}
	},
};
