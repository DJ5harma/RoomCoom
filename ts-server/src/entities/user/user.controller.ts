import type { Request, Response } from "express";
import { ApiError } from "../../../utils/ApiError";
import { TokenService } from "../../token/token.service";
import type { CreatableUser, ResponseUser } from "./user.dto";
import { UserService } from "./user.service";
import crypto from "crypto";
import { log } from "console";

class UserControllerImpl {
	// {
	// 	userId: User["id"];
	// 	accessToken: string;
	// };
	async signin(req: Request, res: Response) {
		const creatableUser = req.body as CreatableUser;
		console.log({ creatableUser });

		let user = await UserService.findUserByEmail(creatableUser.email);

		if (!user) {
			const id = crypto.randomUUID() as string;
			const refreshToken = TokenService.generateRefreshToken({ userId: id });

			const user = await UserService.createUser({
				...creatableUser,
				id,
				refreshToken,
			});
			log("Created user: ", user);
			if (!user) throw ApiError.internal();

			const accessToken = TokenService.generateAccessToken({ userId: user.id });
			res.status(201).json({ user, accessToken });
			return;
		}
		const refreshToken = TokenService.generateRefreshToken({ userId: user.id });

		const accessToken = TokenService.generateAccessToken({ userId: user.id });

		user.refreshToken = refreshToken;
		user = await UserService.updateUser(user.id, user);
		log("updated user: ", user);
		if (!user) throw ApiError.internal();

		console.log({ user });

		res
			.status(200)
			.cookie("access-token", accessToken)
			.cookie("refresh-token", refreshToken, { httpOnly: true, secure: true })
			.json({ user, accessToken });
		return;
	}

	async me(req: Request, res: Response) {
		const user = await UserService.findUserById(req.userId);
		if (!user) throw ApiError.notFound("User not found");

		const { id, email, name, picture, createdAt } = user as ResponseUser;
		const responseUser = {
			id,
			email,
			name,
			picture,
			createdAt,
		} as ResponseUser;
		res.json({ user: responseUser });
	}
}

export const UserController = new UserControllerImpl();
