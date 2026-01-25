import type { Request, Response } from "express";
import { AuthState } from "../../auth/auth.state";
import { UserService } from "./user.service";

class UserControllerImpl {
	async getMe(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const user = await UserService.findById(userId);
		res.json({ user });
	}
}

export const UserController = new UserControllerImpl();
