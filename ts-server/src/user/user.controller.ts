import type { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { TokenService } from "../token/token.service";
import type { CreatableUser } from "./user.dto";
import { UserService } from "./user.service";
import crypto from "crypto";

class UserControllerImpl {
	async signin(req: Request, res: Response) {
		const creatableUser = req.body as CreatableUser;

		let user = await UserService.findUserByEmail(creatableUser.email);

		if (!user) {
			const id = crypto.randomUUID() as string;
			const refreshToken = TokenService.generateToken(
				{ userId: id },
				{ expiresIn: "7d" }
			);
			user = { ...creatableUser, id, createdAt: new Date(), refreshToken };
			user = await UserService.createUser(creatableUser);
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
		user = await UserService.updateUser(user.id, user);
		if (!user) throw ApiError.internal();

		res
			.status(200)
			.json({ user, accessToken })
			.cookie("access-token", accessToken)
			.cookie("refresh-token", refreshToken, { httpOnly: true, secure: true });
		return;
	}
}

export const UserController = new UserControllerImpl();
