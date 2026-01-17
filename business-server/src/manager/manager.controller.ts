import type { Request, Response } from "express";
import { AuthState } from "../auth/auth.state";
import { RoomService } from "../internal/workspace/room/room.service";

class ManagerControllerImpl {
	async getMyRooms(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const rooms = await RoomService.getRoomsForUser(userId);
		res.json({ rooms });
	}
	async createRoom(req: Request, res: Response) {
		const { roomName } = req.body;
		const room = await RoomService.createRoom({ name: roomName });
		res.json({ room });
	}
}

export const ManagerController = new ManagerControllerImpl();
