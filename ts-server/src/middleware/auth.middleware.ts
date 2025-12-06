import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { TokenService } from "../token/token.service";
import type { TokenizedUser } from "../user/user.dto";
import type { AuthRequest } from "../../utils/AuthRequest";

class AuthMiddlewareImpl {
	async authenticate(req: Request, res: Response, next: NextFunction) {
		const { accessToken, refreshToken } = req.cookies;
		if (accessToken) {
			const decoded = TokenService.verifyToken(accessToken) as TokenizedUser;
			if (decoded && decoded.userId) {
				(req as AuthRequest).userId = decoded.userId;
				next();
				return;
			}
		}

		if (refreshToken) {
			const decoded = TokenService.verifyToken(refreshToken) as TokenizedUser;
			if (decoded && decoded.userId) {
				const accessToken = TokenService.generateToken(
					{ userId: decoded.userId },
					{ expiresIn: "10m" }
				);
				(req as AuthRequest).userId = decoded.userId;
				res.cookie("access-token", accessToken);
				next();
				return;
			}
		}

		throw ApiError.unauthorized();
	}
}

export const AuthMiddleware = new AuthMiddlewareImpl();
