import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { TokenService } from "../refreshToken/token.service";
import type { TokenizedUser } from "../entities/user/user.dto";

class AuthMiddlewareImpl {
	async authenticate(req: Request, res: Response, next: NextFunction) {
		const { accessToken, refreshToken } = req.cookies;
		if (accessToken) {
			const decoded = TokenService.verifyAccessToken(
				accessToken
			) as TokenizedUser;
			if (decoded && decoded.userId) {
				req.userId = decoded.userId;
				next();
				return;
			}
		}

		if (refreshToken) {
			const decoded = TokenService.verifyRefreshToken(
				refreshToken
			) as TokenizedUser;
			if (decoded && decoded.userId) {
				const accessToken = TokenService.generateAccessToken({
					userId: decoded.userId,
				});
				req.userId = decoded.userId;
				res.cookie("access-token", accessToken);
				next();
				return;
			}
		}

		throw ApiError.unauthorized();
	}
}

export const AuthMiddleware = new AuthMiddlewareImpl();
