import jwt from "jsonwebtoken";
import { REFRESH_TOKEN } from "./refreshToken.model";
import { AppError } from "../../error/AppError";

type TokenData = { userId: string };

class TokenServiceImpl {
	async createRefreshToken(userId: string) {
		const tokenValue = jwt.sign({ userId }, process.env.REFRESH_SECRET!, {
			expiresIn: "7d",
		});
		const created = await REFRESH_TOKEN.create({ userId, tokenValue });
		return created.tokenValue;
	}
	createAccessToken(userId: string) {
		const tokenValue = jwt.sign({ userId }, process.env.ACCESS_SECRET!, {
			expiresIn: "15m",
		});
		return tokenValue;
	}
	verifyAccessToken(token: string) {
		try {
			const decoded = jwt.verify(
				token,
				process.env.ACCESS_SECRET!
			) as TokenData;
			return decoded;
		} catch {
			throw new AppError(401, "Access Session Expired");
		}
	}
	async verifyRefreshToken(token: string) {
		try {
			const decoded = jwt.verify(
				token,
				process.env.REFRESH_SECRET!
			) as TokenData;
			const exists = await REFRESH_TOKEN.findOne({
				userId: decoded.userId,
				tokenValue: token,
			});
			if (!exists) throw new AppError(401, "Refresh Session Expired");
			return decoded;
		} catch {
			await REFRESH_TOKEN.findOneAndDelete({ tokenValue: token });
		}
	}
	async revokeAllRefreshTokensByUserId(userId: string) {
		await REFRESH_TOKEN.deleteMany({ userId });
	}
}

export const TokenService = new TokenServiceImpl();
