import { Router } from "express";
import { RoomController } from "./room.controller";

export const roomRouter = Router();

roomRouter.post("/", RoomController.create);

roomRouter.use(RoomController.authorizeUser);

roomRouter.get("/:roomId", RoomController.get);
roomRouter.get("/:roomId/instances", RoomController.getInstances);

roomRouter.post("/:roomId/invite", RoomController.inviteUserToRoom);
roomRouter.get("/:roomId/join", RoomController.joinRoom);