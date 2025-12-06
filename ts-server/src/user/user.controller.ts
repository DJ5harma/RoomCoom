import type { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { TokenService } from "../token/token.service";
import type { SavableUser } from "./user.dto";
import { UserService } from "./user.service";
import crypto from "crypto";

class UserControllerImpl {
	async signin(req: Request, res: Response) {
		const savableUser = req.body as SavableUser;

		let user = await UserService.findUserByEmail(savableUser.email);

		if (!user) {
			const id = crypto.randomUUID() as string;
			const refreshToken = TokenService.generateToken(
				{ userId: id },
				{ expiresIn: "7d" }
			);
			user = { ...savableUser, id, createdAt: new Date(), refreshToken };
			user = await UserService.saveUser(savableUser);
			if (!user) throw ApiError.internal();

			res.status(201).json(user);
			return;
		}
		const refreshToken = TokenService.generateToken(
			{ userId: user.id },
			{ expiresIn: "7d" }
		);
		const accessToken = TokenService.generateToken(
			{ userId: user.id },
			{ expiresIn: "10m" }
		);
		user.refreshToken = refreshToken;
		await UserService.saveUser(user);

		res
			.status(200)
			.json({ user, accessToken })
			.cookie("access-token", accessToken)
			.cookie("refresh-token", refreshToken, { httpOnly: true, secure: true });
		return;
	}
}

export const UserController = new UserControllerImpl();
