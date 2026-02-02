import { Router } from "express";
import { UserController } from "./user.controller";
import { NotificationController } from "../plugins/notification/notification.controller";

export const userRouter = Router();

userRouter.get("/me", UserController.getMe);
userRouter.get("/rooms", UserController.getRooms);
userRouter.get("/search", UserController.searchUsers);
userRouter.get(
	"/roomInvitations",
	NotificationController.getUserRoomInvitations,
);
