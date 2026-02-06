import { Router } from "express";
import { RoomController } from "./room.controller";

export const roomRouter = Router();

roomRouter.post("/", RoomController.create);

roomRouter.use(RoomController.authorizeUser);

roomRouter.get("/:roomId", RoomController.get);
roomRouter.post("/:roomId/club", RoomController.addClub);

roomRouter.post("/:roomId/invite", RoomController.inviteUserToRoom);
roomRouter.get("/:roomId/join", RoomController.joinRoom);
