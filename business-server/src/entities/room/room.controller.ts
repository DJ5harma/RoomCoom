import type { Request, Response } from "express";
import { AuthState } from "../../auth/auth.state";
import { RoomService } from "./room.service";
import type { uuid } from "../../types";

class RoomControllerImpl {
	async createRoom(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const { name } = req.body;
		const room = await RoomService.createRoom({ name, makerId: userId });
		res.json({ room });
	}
	async joinRoom(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const { roomId } = req.params as { roomId: uuid };
		const room = await RoomService.joinRoom({ joinerId: userId, roomId });
		res.json({ room });
	}
}

export const RoomController = new RoomControllerImpl();
