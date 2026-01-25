import type { NextFunction, Request, Response } from "express";
import { AuthState } from "../../auth/auth.state";
import { RoomService } from "./room.service";
import type { uuid } from "../../types";
import { ContainerService } from "../container/container.service";
import { AppError } from "../../error/AppError";

class RoomControllerImpl {
	async authorizeUser(req: Request, _res: Response, next: NextFunction) {
		const userId = AuthState.getUserId(req);
		const roomId = req.body.roomId || req.params.roomId || req.query.roomId;
		if (!roomId) {
			next();
			return;
		}
		const existsInRoom = RoomService.userExistsInRoom({ userId, roomId });
		if(!existsInRoom) {
			throw new AppError(403, "Access to room is forbidden");
		}
		next();
	}

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
	async getContainers(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		const containers = await ContainerService.getContainersInsideRoom(roomId);
		res.json({ containers });
	}
}

export const RoomController = new RoomControllerImpl();
