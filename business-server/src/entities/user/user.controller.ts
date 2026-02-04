import type { Request, Response } from "express";
import { AuthState } from "../../auth/auth.state";
import { UserService } from "./user.service";
import { RoomService } from "../room/room.service";
import type { uuid } from "../../types";
import { UserInvitation } from "./user.invitation";
import { AppError } from "../../error/AppError";
import { InstanceService } from "../instance/instance.service";

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
	async searchUsers(req: Request, res: Response) {
		const { q } = req.query as { q: string };
		const users = await UserService.search(q);
		res.json({ users });
	}
	async getDirectInstances(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const instances = await InstanceService.getUserDirectInstances(userId);
		console.log({instances});
		
		res.json({ instances });
	}
	async getPersonalInstances(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const instances = await InstanceService.getUserPersonalInstances(userId);
		res.json({ instances });
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
}

export const UserController = new UserControllerImpl();
