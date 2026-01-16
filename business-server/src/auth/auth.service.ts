import jwt from "jsonwebtoken";
import { ENV_CONSTANTS } from "../constants/env.constants";

export const AuthService = {
	verifyUser(access_token: string) {
		return jwt.verify(access_token, ENV_CONSTANTS.ACCESS_SECRET) as {
			userId: string;
		};
	},
};
