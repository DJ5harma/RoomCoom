import type { NextFunction, Request, Response } from "express";
import { AuthState } from "../../auth/auth.state";
import type { RoomI, uuid } from "../../types";
import { AppError } from "../../error/AppError";
import { RoomService } from "./room.service";
import { UserInvitation } from "../user/user.invitation";
import { io } from "../../main";
import { SpaceService } from "../space/space.service";

class RoomControllerImpl {
	async authorizeUser(req: Request, _res: Response, next: NextFunction) {
		const userId = AuthState.getUserId(req);
		const roomId = req.body?.roomId || req.params.roomId || req.query.roomId;
		if (!roomId) {
			next();
			return;
		}
		const existsInRoom = await RoomService.userExistsInRoom(userId, roomId);
		if (!existsInRoom) {
			throw new AppError(403, "Access to room is forbidden");
		}
		next();
	}
	async create(req: Request, res: Response) {
		const creatorId = AuthState.getUserId(req);
		const { name, members } = req.body as {
			name: string;
			members: RoomI["members"];
		};
		members.push({ user: creatorId });
		const newRoom = await RoomService.createRoom(name, creatorId, members);
		const room = await RoomService.getRoomById(newRoom.id);
		res.json({ room });
	}
	async get(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		const room = await RoomService.getRoomById(roomId);
		const clubs = await SpaceService.getSpacesBySpaceIds(
			room!.clubs.map(({ club }) => club) as uuid[],
		);
		res.json({ room, clubs });
	}
	async addClub(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		let { name, memberIds } = req.body as { name: string; memberIds?: uuid[] };
		const creatorId = AuthState.getUserId(req);

		if (!memberIds) memberIds = [];
		if (!memberIds.includes(creatorId)) memberIds.push(creatorId);

		const existingMemberIds = await RoomService.getRoomMemberIds(roomId);

		for (const tid of memberIds) {
			if (!existingMemberIds.includes(tid)) {
				throw new AppError(
					400,
					"Not all specified memberIds are inside the room",
				);
			}
		}
		const club = await SpaceService.createSpace(name, creatorId, memberIds);
		await RoomService.addClubToRoom(roomId, club.id);

		res.json({ club });
	}

	async joinRoom(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const { roomId } = req.params as { roomId: uuid };
		await RoomService.addUserToRoom(roomId, userId);
		const room = await RoomService.getRoomById(roomId);
		res.json({ room });
	}
	async inviteUserToRoom(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		const { userId } = req.body;

		const alreadyThere = await RoomService.userExistsInRoom(userId, roomId);
		if (alreadyThere) {
			throw new AppError(400, "Person already exists in the Room");
		}
		const room = await RoomService.getRoomById(roomId);
		io.to(userId).emit("notification:roomInvite", {
			room,
		});

		await UserInvitation.storeUserRoomInvitation({ userId, roomId });
		res.send();
	}
}

export const RoomController = new RoomControllerImpl();
