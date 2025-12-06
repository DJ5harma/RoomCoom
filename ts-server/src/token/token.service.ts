import jwt from "jsonwebtoken";
import type { TokenizedUser } from "../entities/user/user.dto";

const JWT_SECRET_ACCESS_TOKEN = process.env.JWT_SECRET_ACCESS_TOKEN as string;
const JWT_SECRET_REFRESH_TOKEN = process.env.JWT_SECRET_REFRESH_TOKEN as string;

class TokenServiceImpl {
	generateAccessToken(payload: TokenizedUser) {
		const token = jwt.sign(payload, JWT_SECRET_ACCESS_TOKEN, {
			expiresIn: "10m",
		});
		return token;
	}
	generateRefreshToken(payload: TokenizedUser) {
		const token = jwt.sign(payload, JWT_SECRET_REFRESH_TOKEN, {
			expiresIn: "7d",
		});
		return token;
	}
	verifyAccessToken(token: string) {
		const decoded = jwt.verify(token, JWT_SECRET_ACCESS_TOKEN);
		return decoded;
	}
	verifyRefreshToken(token: string) {
		const decoded = jwt.verify(token, JWT_SECRET_REFRESH_TOKEN);
		return decoded;
	}
}

export const TokenService = new TokenServiceImpl();
