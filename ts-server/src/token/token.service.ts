import jwt, { type SignOptions } from "jsonwebtoken";
import type { TokenizedUser } from "../user/user.dto";

const JWT_SECRET = process.env.JWT_SECRET as string;

class TokenServiceImpl {
	generateToken(payload: TokenizedUser, options: SignOptions) {
		const token = jwt.sign(payload, JWT_SECRET, options);
		return token;
	}
	verifyToken(token: string) {
		const decoded = jwt.verify(token, JWT_SECRET);
		return decoded;
	}
}

export const TokenService = new TokenServiceImpl();
