import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../../../utils/ApiError";
import { TokenService } from "../../token/token.service";
import { RefreshTokenRepo } from "../../token/refreshToken.repo";
import type { CreateUserDTO, ResponseUserDTO } from "./user.dto";
import { UserService } from "./user.service";

class UserControllerImpl {
	async signin(req: Request, res: Response, next: NextFunction) {
		try {
			const creatableUser = req.body as CreateUserDTO;

			if (!creatableUser.email || !creatableUser.name) {
				throw ApiError.badRequest("Email and name are required");
			}

			const existingUser = await UserService.findUserByEmail(
				creatableUser.email
			);

			if (!existingUser) {
				// Create new user
				const user = await UserService.createUser(creatableUser);
				if (!user) {
					throw ApiError.internal("Failed to register user");
				}

				const refreshToken = TokenService.generateRefreshToken({
					userId: user.id,
				});

				// Save refresh token to database
				await RefreshTokenRepo.create({
					userId: user.id,
					token: refreshToken,
				});

				const accessToken = TokenService.generateAccessToken({
					userId: user.id,
				});

				const responseUser: ResponseUserDTO = {
					id: user.id,
					email: user.email,
					name: user.name,
					picture: user.picture,
					createdAt: user.createdAt,
				};

				const isProduction = process.env.NODE_ENV === "production";
				const cookieOptions = {
					httpOnly: true,
					secure: isProduction,
					sameSite: (isProduction ? "strict" : "lax") as
						| "strict"
						| "lax"
						| "none",
					path: "/",
				};

				res
					.status(201)
					.cookie("access-token", accessToken, {
						...cookieOptions,
						maxAge: 10 * 60 * 1000, // 10 minutes
					})
					.cookie("refresh-token", refreshToken, {
						...cookieOptions,
						maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
					})
					.json({ user: responseUser, accessToken });
				return;
			}

			// Existing user - generate new tokens
			const refreshToken = TokenService.generateRefreshToken({
				userId: existingUser.id,
			});

			// Delete old refresh tokens for this user and save new one
			await RefreshTokenRepo.deleteByUserId(existingUser.id);
			await RefreshTokenRepo.create({
				userId: existingUser.id,
				token: refreshToken,
			});

			const accessToken = TokenService.generateAccessToken({
				userId: existingUser.id,
			});

			const responseUser: ResponseUserDTO = {
				id: existingUser.id,
				email: existingUser.email,
				name: existingUser.name,
				picture: existingUser.picture,
				createdAt: existingUser.createdAt,
			};

			const isProduction = process.env.NODE_ENV === "production";
			const cookieOptions = {
				httpOnly: true,
				secure: isProduction,
				sameSite: (isProduction ? "strict" : "lax") as
					| "strict"
					| "lax"
					| "none",
				path: "/",
			};

			res
				.status(200)
				.cookie("access-token", accessToken, {
					...cookieOptions,
					maxAge: 10 * 60 * 1000, // 10 minutes
				})
				.cookie("refresh-token", refreshToken, {
					...cookieOptions,
					maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
				})
				.json({ user: responseUser, accessToken });
		} catch (error) {
			next(error);
		}
	}

	async me(req: Request, res: Response, next: NextFunction) {
		try {
			if (!req.userId) {
				throw ApiError.unauthorized("User not authenticated");
			}

			const user = await UserService.findUserById(req.userId);
			if (!user) {
				throw ApiError.notFound("User not found");
			}

			const responseUser: ResponseUserDTO = {
				id: user.id,
				email: user.email,
				name: user.name,
				picture: user.picture,
				createdAt: user.createdAt,
			};

			res.json({ user: responseUser });
		} catch (error) {
			next(error);
		}
	}
}

export const UserController = new UserControllerImpl();
