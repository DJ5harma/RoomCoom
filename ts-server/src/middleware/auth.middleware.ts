import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { TokenService } from "../token/token.service";
import { RefreshTokenRepo } from "../token/refreshToken.repo";
import type { TokenizedUserDTO } from "../entities/user/user.dto";

class AuthMiddlewareImpl {
	async authenticate(req: Request, res: Response, next: NextFunction) {
		try {
			// Access cookies directly to avoid destructuring issues
			const accessToken = req.cookies["access-token"];
			const refreshToken = req.cookies["refresh-token"];

			// Debug logging in development
			if (process.env.NODE_ENV !== "production") {
				console.log("Auth Middleware - Cookies received:", {
					hasAccessToken: !!accessToken,
					hasRefreshToken: !!refreshToken,
					accessTokenValue: accessToken ? `${accessToken.substring(0, 20)}...` : "undefined",
					refreshTokenValue: refreshToken ? `${refreshToken.substring(0, 20)}...` : "undefined",
					allCookies: req.cookies,
					cookieHeader: req.headers.cookie,
				});
			}

			// Try to verify access token first
			if (accessToken) {
				try {
					const decoded = TokenService.verifyAccessToken(
						accessToken
					) as TokenizedUserDTO;
					if (decoded && decoded.userId) {
						req.userId = decoded.userId;
						next();
						return;
					}
				} catch {
					// Access token is invalid, try refresh token
				}
			}

			// If access token is missing or invalid, try refresh token
			if (refreshToken) {
				try {
					const decoded = TokenService.verifyRefreshToken(
						refreshToken
					) as TokenizedUserDTO;

					if (decoded && decoded.userId) {
						// Verify refresh token exists in database
						const storedToken = await RefreshTokenRepo.findByToken(
							refreshToken
						);

						if (!storedToken || storedToken.userId !== decoded.userId) {
							throw ApiError.unauthorized("Invalid refresh token");
						}

						// Generate new access token
						const newAccessToken = TokenService.generateAccessToken({
							userId: decoded.userId,
						});

						const isProduction = process.env.NODE_ENV === "production";
						req.userId = decoded.userId;
						res.cookie("access-token", newAccessToken, {
							httpOnly: true,
							secure: isProduction,
							sameSite: (isProduction ? "strict" : "lax") as
								| "strict"
								| "lax"
								| "none",
							path: "/",
							maxAge: 10 * 60 * 1000, // 10 minutes
						});
						next();
						return;
					}
				} catch (error) {
					// Refresh token is invalid
					if (error instanceof ApiError) {
						throw error;
					}
				}
			}

			throw ApiError.unauthorized("Authentication required");
		} catch (error) {
			next(error);
		}
	}
}

export const AuthMiddleware = new AuthMiddlewareImpl();
