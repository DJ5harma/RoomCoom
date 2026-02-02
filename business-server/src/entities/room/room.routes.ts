import { Router } from "express";
import { RoomController } from "./room.controller";
import { containerRouter } from "../container/container.routes";
import { NotificationController } from "../plugins/notification/notification.controller";

export const roomRouter = Router();

roomRouter.post("/create", RoomController.createRoom);

roomRouter.use(RoomController.authorizeUser);

roomRouter.get("/:roomId", RoomController.getRoom);
roomRouter.get("/:roomId/join", RoomController.joinRoom);
roomRouter.get("/:roomId/members", RoomController.getMembers);
roomRouter.get("/:roomId/containers", RoomController.getContainers);

roomRouter.use("/:roomId/container", containerRouter);

// Notification Plugin
roomRouter.post("/:roomId/invite", NotificationController.inviteUserToRoom);
