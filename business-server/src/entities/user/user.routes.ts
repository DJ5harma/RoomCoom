import { Router } from "express";
import { UserController } from "./user.controller";

export const userRouter = Router();

userRouter.get("/me", UserController.getMe);
userRouter.get("/rooms", UserController.getRooms);

userRouter.get("/instances/personal", UserController.getPersonalInstances);
userRouter.get("/instances/direct", UserController.getDirectInstances);

userRouter.get("/search", UserController.searchUsers);

userRouter.get("/room-invitations", UserController.getUserRoomInvitations);
userRouter.get("/room-invitation/accept/:roomId", UserController.acceptRoomInvitation);