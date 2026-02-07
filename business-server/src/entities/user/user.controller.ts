import type { NextFunction, Request, Response } from "express";
import { AuthState } from "../../auth/auth.state";
import { UserService } from "./user.service";
import { RoomService } from "../room/room.service";
import type { uuid } from "../../types";
import { UserInvitation } from "./user.invitation";
import { AppError } from "../../error/AppError";
import { SpaceService } from "../space/space.service";

class UserControllerImpl {
	async getMe(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const user = await UserService.findById(userId);
		res.json({ user });
	}
	async getRooms(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const rooms = await RoomService.getUserRooms(userId);
		res.json({ rooms });
	}
	async getDirectSpaces(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const spaces = await SpaceService.findDirectSpacesForUser(userId);
		res.json({ spaces });
	}
	async searchUsers(req: Request, res: Response) {
		const { q } = req.query as { q: string };
		const users = await UserService.search(q);
		res.json({ users });
	}

	async getDirect(req: Request, res: Response) {
		const { peerId } = req.params as { peerId: uuid };
		const peerExists = await UserService.existsById(peerId);
		if (!peerExists) {
			throw new AppError(
				404,
				"The peer you're trying to connect to was not found",
			);
		}
		const userId = AuthState.getUserId(req);
		let space = await SpaceService.findExactlyOneTheseMembersSpace(
			[userId, peerId],
			{ name: "DIRECT" },
		);
		const creatorId = userId;
		if (!space) {
			space = await SpaceService.createSpace("DIRECT", creatorId, [
				userId,
				peerId,
			]);
		}
		res.json({ space });
	}

	async getUserRoomInvitations(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const rooms = await UserInvitation.getUserRoomInvitations({ userId });
		res.json({ rooms });
	}
	async acceptRoomInvitation(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		const userId = AuthState.getUserId(req);
		const IsInvitationValid =
			await UserInvitation.verifyUserRoomInvitationExists({ roomId, userId });
		if (!IsInvitationValid) {
			throw new AppError(
				403,
				"Your invitation has expired or you were not invited",
			);
		}
		await RoomService.addUserToRoom(roomId, userId);
		const room = await RoomService.getRoomById(roomId);
		res.json({ room });
	}

	authorizePersonal(req: Request, _: Response, next: NextFunction) {
		const { userId } = req.params;
		if (AuthState.getUserId(req) !== userId) {
			throw new AppError(
				401,
				"Personal plugin shall only request regarding the user",
			);
		}
		next();
	}
}

export const UserController = new UserControllerImpl();
