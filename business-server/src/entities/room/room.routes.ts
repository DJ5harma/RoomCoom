import { Router } from "express";
import { RoomController } from "./room.controller";

export const roomRouter = Router();

roomRouter.post("/create", RoomController.createRoom);

roomRouter.use(RoomController.authorizeUser);

roomRouter.get("/:roomId", RoomController.getRoom);
roomRouter.post("/:roomId/instance", RoomController.createInstance);
roomRouter.get("/:roomId/instances", RoomController.getInstances);

roomRouter.post("/:roomId/invite", RoomController.inviteUserToRoom);
roomRouter.get("/:roomId/join", RoomController.joinRoom);