import jwt, { type SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

class TokenServiceImpl {
	generateToken(payload: object, expiresIn: SignOptions["expiresIn"]) {
		const token = jwt.sign(payload, JWT_SECRET, { expiresIn });
	}
}

export const TokenService = new TokenServiceImpl();
