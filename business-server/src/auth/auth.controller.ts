import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../entities/user/user.service";
import type { UserType } from "../entities/user/user.type";
import type { createUserDTO } from "../entities/user/user.dto";
import { ENV_CONSTANTS } from "../constants/env.constants";

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
};
