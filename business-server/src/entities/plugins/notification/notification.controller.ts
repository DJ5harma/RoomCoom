import type { Request, Response } from "express";
import type { uuid } from "../../../types";
import { RoomService } from "../../room/room.service";
import { AppError } from "../../../error/AppError";
import { AuthState } from "../../../auth/auth.state";
import { io } from "../../../main";
import { UserInvitation } from "../../user/user.invitation";

class NotificationControllerImpl {
	async inviteUserToRoom(req: Request, res: Response) {
		const { roomId } = req.params as { roomId: uuid };
		const { userId } = req.body;

		const alreadyThere = await RoomService.userExistsInRoom({ roomId, userId });
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
	async getUserRoomInvitations(req: Request, res: Response) {
		const userId = AuthState.getUserId(req);
		const rooms = await UserInvitation.getUserRoomInvitations({ userId });
		res.json({ rooms });
	}
}

export const NotificationController = new NotificationControllerImpl();
