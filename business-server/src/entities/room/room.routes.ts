import { Router } from "express";
import { RoomController } from "./room.controller";
import { instanceRouter } from "../instance/instance.routes";

export const roomRouter = Router();

roomRouter.post("/create", RoomController.createRoom);

roomRouter.use(RoomController.authorizeUser);

// roomRouter.get("/:roomId", RoomController.getRoom);
roomRouter.get("/:roomId/join", RoomController.joinRoom);
roomRouter.get("/:roomId/members", RoomController.getMembers);
// roomRouter.get("/:roomId/instances", RoomController.getInstances);
roomRouter.post("/:roomId/invite", RoomController.inviteUserToRoom);

roomRouter.use("/:roomId/instance", instanceRouter);