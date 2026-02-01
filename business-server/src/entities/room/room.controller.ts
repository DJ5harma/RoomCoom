import type { NextFunction, Request, Response } from "express";
import { AuthState } from "../../auth/auth.state";
import type { uuid } from "../../types";
import { ContainerService } from "../container/container.service";
import { AppError } from "../../error/AppError";
import { RoomService } from "./room.service";

class RoomControllerImpl {
	async authorizeUser(req: Request, _res: Response, next: NextFunction) {
		const userId = AuthState.getUserId(req);
		const roomId = req.body.roomId || req.params.roomId || req.query.roomId;
		if (!roomId) {
			next();
			return;
		}
		const existsInRoom = RoomService.userExistsInRoom({ userId, roomId });
		if (!existsInRoom) {
			throw new AppError(403, "Access to room is forbidden");
		}
		next();
	}

	async createRoom(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const { name } = req.body;
		const room = await RoomService.createRoom({ name, creatorId: userId });
		await RoomService.addUserToRoom({ roomId: room.id, userId });
		res.json({ room });
	}
	async joinRoom(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const { roomId } = req.params as { roomId: uuid };
		await RoomService.addUserToRoom({ roomId, userId });
		const room = await RoomService.getRoomById(roomId);
		return res.json({ room });
	}
	async getContainers(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		const containers = await ContainerService.getContainersInRoom(roomId);
		res.json({ containers });
	}
}

export const RoomController = new RoomControllerImpl();
