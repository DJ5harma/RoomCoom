import type { Request, Response } from "express";
import { AuthState } from "../../auth/auth.state";
import { UserService } from "./user.service";
import { RoomService } from "../room/room.service";

class UserControllerImpl {
	async getMe(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const user = await UserService.findById(userId);
		res.json({ user });
	}
	async getRooms(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const rooms = await RoomService.getUserRooms({ userId });
		res.json({ rooms });
	}
	async searchUsers(req: Request, res: Response) {
		const { q } = req.query as { q: string };
		const users = await UserService.search(q);
		res.json({ users });
	}
}

export const UserController = new UserControllerImpl();
